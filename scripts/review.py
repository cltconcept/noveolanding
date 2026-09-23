"""Local browser checks. Requires Python playwright and an installed Chrome."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import json
import os

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / '.qa'
OUT.mkdir(exist_ok=True)
BASE = os.environ.get('QA_URL', 'http://127.0.0.1:4321')
report = []

with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    for name, route, viewport in [
        ('home-desktop', '/', {'width': 1440, 'height': 1000}),
        ('home-mobile', '/', {'width': 390, 'height': 844}),
        ('brand-desktop', '/image-de-marque/', {'width': 1440, 'height': 1000}),
        ('contact-desktop', '/contact/', {'width': 1440, 'height': 1000}),
        ('contact-mobile', '/contact/?service=it', {'width': 390, 'height': 844}),
        ('home-nl', '/nl/', {'width': 1440, 'height': 1000}),
    ]:
        page = browser.new_page(viewport=viewport)
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto(BASE + route, wait_until='networkidle')
        page.wait_for_timeout(1500)
        page.screenshot(path=str(OUT / (name + '.png')))
        for y in range(0, page.evaluate('document.documentElement.scrollHeight'), 650):
            page.evaluate('(y) => window.scrollTo({top:y,behavior:"instant"})', y)
            page.wait_for_timeout(100)
        page.wait_for_timeout(850)
        page.evaluate('window.scrollTo({top:0,behavior:"instant"})')
        page.wait_for_timeout(200)
        page.screenshot(path=str(OUT / (name + '-full.png')), full_page=True)
        page.add_script_tag(path=str(ROOT / 'node_modules/axe-core/axe.min.js'))
        violations = page.evaluate('''async () => (await axe.run(document, {runOnly: {type: 'tag', values: ['wcag2a','wcag2aa','wcag21aa']}})).violations.map(v => ({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))''')
        metrics = page.evaluate('''() => ({width:innerWidth, scrollWidth:document.documentElement.scrollWidth, h1:document.querySelectorAll('h1').length, brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src), font:document.fonts.check('16px "Manrope Variable"'), lang:document.documentElement.lang})''')
        report.append({'name': name, 'metrics': metrics, 'errors': errors, 'accessibility': violations})
        print(json.dumps({'name':name,'metrics':metrics,'errors':errors,'accessibility':[{ 'id':v['id'], 'nodes':len(v['nodes']) } for v in violations]}), flush=True)
        page.close()
    browser.close()
(OUT / 'review.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
