"""Functional smoke checks against a running Noveo site. No real form is sent."""
from pathlib import Path
from playwright.sync_api import sync_playwright, expect
import json
import os

ROOT = Path(__file__).resolve().parents[1]
BASE = os.environ.get('QA_URL', 'http://127.0.0.1:4321')
SLUGS = ['', 'image-de-marque/', 'web-erp/', 'telecom/', 'it-cybersecurite/', 'impression/', 'contact/', 'mentions-legales/']
results = []

with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    context = browser.new_context(reduced_motion='reduce', viewport={'width':1440,'height':1000})
    context.route('https://formbold.com/**', lambda route: route.abort())
    page = context.new_page()
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    for locale in ['fr','nl','en']:
        for slug in SLUGS:
            route = '/' + ('' if locale=='fr' else locale+'/') + slug
            response = page.goto(BASE+route, wait_until='networkidle')
            assert response.status==200, (route, response.status)
            expect(page.locator('h1')).to_have_count(1)
            expect(page.locator('html')).to_have_attribute('lang', locale)
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), route
            assert page.locator('link[rel="alternate"][hreflang]').count()==4, route
            assert page.locator('main').inner_text().strip(), route
    assert not errors, errors
    results.append('24 routes, languages, headings, metadata and desktop layouts')

    for width in [360, 390, 768, 1024]:
        page.set_viewport_size({'width':width,'height':900})
        for route in ['/', '/nl/', '/en/', '/contact/', '/image-de-marque/', '/web-erp/', '/telecom/', '/it-cybersecurite/', '/impression/']:
            page.goto(BASE+route, wait_until='networkidle')
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (width, route)
    results.append('36 responsive page/viewport combinations without horizontal overflow')

    page.set_viewport_size({'width':390,'height':844})
    page.goto(BASE+'/')
    toggle=page.locator('.menu-toggle')
    toggle.click()
    expect(toggle).to_have_attribute('aria-expanded','true')
    assert page.locator('main').evaluate('(el)=>el.inert')
    expect(page.locator('.mobile-primary').first).to_be_focused()
    page.keyboard.press('Escape')
    expect(toggle).to_have_attribute('aria-expanded','false')
    expect(toggle).to_be_focused()
    toggle.click()
    page.locator('.mobile-primary').first.click()
    expect(toggle).to_have_attribute('aria-expanded','false')
    assert not page.locator('main').evaluate('(el)=>el.inert')
    results.append('Mobile menu, focus management, Escape and anchor navigation')

    page.set_viewport_size({'width':1440,'height':1000})
    page.goto(BASE+'/')
    track=page.locator('#project-track')
    track.scroll_into_view_if_needed()
    page.locator('[data-project-next]').click()
    page.wait_for_timeout(150)
    assert track.evaluate('(el)=>el.scrollLeft') > 0
    page.locator('[data-project-prev]').click()
    page.wait_for_timeout(150)
    assert track.evaluate('(el)=>el.scrollLeft') < 3
    page.locator('.faq-item summary').nth(0).click()
    expect(page.locator('.faq-item').nth(0)).to_have_attribute('open','')
    page.locator('.faq-item summary').nth(1).click()
    assert not page.locator('.faq-item').nth(0).evaluate('(el)=>el.open')
    results.append('Portfolio navigation and FAQ accordion')

    page.goto(BASE+'/web-erp/')
    page.locator('.language-switch summary').click()
    page.locator('.language-options a[lang="en"]').click()
    expect(page).to_have_url(BASE+'/en/web-erp/')
    results.append('Language switch preserves the current page')

    page.goto(BASE+'/contact/?service=it')
    expect(page.locator('[data-service-id="it"]')).to_be_checked()
    assert page.locator('#contact-form').get_attribute('action') is None, 'endpoint must not be exposed in HTML'
    assert 'formbold' not in page.content(), 'endpoint must not be exposed in HTML'
    assert not page.locator('#contact-form').evaluate('(el)=>el.checkValidity()')
    page.locator('#name').fill('Test local')
    page.locator('#email').fill('test@example.invalid')
    page.locator('#message').fill('Vérification locale du formulaire, sans envoi réel.')
    page.locator('input[name="consent"]').check()
    assert page.locator('#contact-form').evaluate('(el)=>el.checkValidity()')
    # Page routes take precedence over the context-level abort; every POST is intercepted.
    page.route('https://formbold.com/**', lambda route: route.fulfill(status=503, body='Unavailable'))
    page.locator('.form-submit').click()
    expect(page.locator('.form-status')).to_be_visible()
    expect(page.locator('#message')).to_have_value('Vérification locale du formulaire, sans envoi réel.')
    expect(page.locator('.form-submit')).to_be_enabled()
    page.unroute('https://formbold.com/**')
    page.route('https://formbold.com/**', lambda route: route.fulfill(status=200,content_type='application/json',body='{"success":false}'))
    page.locator('.form-submit').click()
    expect(page.locator('.form-status')).to_be_visible()
    expect(page.locator('.form-success')).to_be_hidden()
    page.unroute('https://formbold.com/**')
    sent=[]
    def success_route(route):
        sent.append(route.request.post_data)
        route.fulfill(status=200,content_type='application/json',body='{"success":true}')
    page.route('https://formbold.com/**',success_route)
    page.locator('.form-submit').click()
    expect(page.locator('.form-success')).to_be_visible()
    assert sent and 'IT & cybersécurité' in sent[0] and 'name="language"' in sent[0]
    assert 'name="_gotcha"' in sent[0], 'FormBold honeypot must be sent'
    expect(page.locator('.form-success')).to_be_focused()
    page.locator('[data-form-reset]').click()
    expect(page.locator('#contact-form')).to_be_visible()
    expect(page.locator('#name')).to_be_focused()
    page.locator('#name').fill('Robot')
    page.locator('#email').fill('bot@example.invalid')
    page.locator('#message').fill('Message de robot qui remplit le piège.')
    page.locator('input[name="consent"]').check()
    page.locator('input[name="_gotcha"]').evaluate('(el)=>{el.value="https://spam.invalid"}')
    page.locator('.form-submit').click()
    expect(page.locator('.form-success')).to_be_visible()
    assert len(sent) == 1, 'a filled honeypot must not be sent'
    results.append('Contact preselection, required fields, server error, rejected payload, success, reset and honeypot (mocked)')

    page.goto(BASE+'/')
    assert page.locator('.orbit-node').first.evaluate('(el)=>getComputedStyle(el).animationName')=='none'
    assert page.locator('[data-reveal]').first.evaluate('(el)=>getComputedStyle(el).opacity')=='1'
    results.append('Reduced motion preference')
    nojs=browser.new_context(java_script_enabled=False,viewport={'width':390,'height':844})
    nojs_page=nojs.new_page()
    nojs_page.goto(BASE+'/')
    expect(nojs_page.locator('#hero-title')).to_be_visible()
    expect(nojs_page.locator('.service-card').first).to_be_visible()
    results.append('Content and service links available without JavaScript')
    browser.close()

(ROOT/'.qa').mkdir(exist_ok=True)
(ROOT/'.qa/functional.json').write_text(json.dumps(results,indent=2),encoding='utf-8')
for result in results: print('PASS:',result)
