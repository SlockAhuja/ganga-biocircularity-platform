import os
import subprocess
import sys
import shutil

def deploy():
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    dist_dir = os.path.join(repo_root, "frontend", "dist")

    if not os.path.exists(dist_dir) or not os.path.exists(os.path.join(dist_dir, "index.html")):
        print("[ERROR] frontend/dist/index.html not found! Run npm run build first.")
        sys.exit(1)

    print("[*] Preparing gh-pages branch deployment from frontend/dist...")

    # Ensure .nojekyll and 404.html exist in dist
    nojekyll_path = os.path.join(dist_dir, ".nojekyll")
    if not os.path.exists(nojekyll_path):
        with open(nojekyll_path, "w") as f:
            pass

    index_path = os.path.join(dist_dir, "index.html")
    four04_path = os.path.join(dist_dir, "404.html")
    if not os.path.exists(four04_path):
        shutil.copyfile(index_path, four04_path)

    # Use a temporary git index to commit dist_dir content directly
    env = os.environ.copy()
    temp_index = os.path.join(repo_root, ".git", "index_ghpages")
    env["GIT_INDEX_FILE"] = temp_index
    env["GIT_WORK_TREE"] = dist_dir

    try:
        # Clear any prior temp index
        if os.path.exists(temp_index):
            os.remove(temp_index)

        # Add all files in dist to temp index
        subprocess.run(["git", "add", "-A", "."], cwd=dist_dir, env=env, check=True)

        # Write tree
        tree_id = subprocess.check_output(["git", "write-tree"], cwd=dist_dir, env=env).decode().strip()
        print(f"[+] Created git tree: {tree_id}")

        # Get parent commit of origin/gh-pages if it exists
        parent_args = []
        try:
            parent_commit = subprocess.check_output(["git", "rev-parse", "origin/gh-pages"], cwd=repo_root).decode().strip()
            parent_args = ["-p", parent_commit]
        except Exception:
            pass

        # Commit tree
        commit_cmd = ["git", "commit-tree", tree_id, "-m", "deploy: publish BioRiver React single-page app to GitHub Pages"] + parent_args
        commit_id = subprocess.check_output(commit_cmd, cwd=repo_root).decode().strip()
        print(f"[+] Created gh-pages commit: {commit_id}")

        # Update gh-pages branch and push
        subprocess.run(["git", "branch", "-f", "gh-pages", commit_id], cwd=repo_root, check=True)
        push_res = subprocess.run(["git", "push", "origin", "gh-pages", "--force"], cwd=repo_root, check=True)
        print("[SUCCESS] Successfully pushed compiled React BioRiver application to origin/gh-pages!")

    finally:
        if os.path.exists(temp_index):
            os.remove(temp_index)

if __name__ == "__main__":
    deploy()
