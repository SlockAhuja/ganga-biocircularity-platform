import urllib.request
import re

def check():
    url = "https://slockahuja.github.io/ganga-biocircularity-platform/"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req) as res:
            html = res.read().decode("utf-8", errors="ignore")
            status = res.status
            print(f"URL: {url}")
            print(f"HTTP Status: {status}")
            print(f"Content Length: {len(html)} bytes")

            has_root = 'id="root"' in html
            has_react_bundle = "assets/index" in html
            title_match = re.search(r"<title>(.*?)</title>", html)
            title = title_match.group(1).encode('ascii', 'replace').decode('ascii') if title_match else "No title found"

            print(f"Title: {title}")
            print(f"Contains <div id=\"root\">: {has_root}")
            print(f"Contains React JS bundle: {has_react_bundle}")

            if has_root and has_react_bundle:
                print("[PASS] GitHub Pages is serving the compiled React BioRiver application!")
            else:
                print("[NOTE] GitHub Pages is currently serving the repository README Jekyll page (Length: " + str(len(html)) + " bytes).")
                print("[ACTION REQUIRED] In GitHub Repository: Settings -> Pages -> Build and deployment -> Source, select either 'GitHub Actions' OR branch 'gh-pages' / '/ (root)'.")
    except Exception as e:
        print(f"[ERROR] Failed to fetch {url}: {e}")

if __name__ == "__main__":
    check()
