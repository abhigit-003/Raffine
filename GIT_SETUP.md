# Git Setup Guide for Raffine Frontend

## Quick Start

### Option 1: Create New Repository on GitHub/GitLab

1. **Initialize Git in your project:**
```bash
cd C:\Users\Lenovo\OneDrive\Desktop\Raffine\frontend
git init
```

2. **Add all files:**
```bash
git add .
```

3. **Make your first commit:**
```bash
git commit -m "Initial commit: Complete Raffine frontend with all features"
```

4. **Create repository on GitHub/GitLab:**
   - Go to GitHub.com or GitLab.com
   - Click "New Repository"
   - Name it "raffine-frontend" or "raffine"
   - Don't initialize with README (you already have one)

5. **Connect and push:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/raffine-frontend.git
git branch -M main
git push -u origin main
```

### Option 2: Use Existing Repository

If you already have a repository:
```bash
cd C:\Users\Lenovo\OneDrive\Desktop\Raffine\frontend
git init
git remote add origin YOUR_REPOSITORY_URL
git add .
git commit -m "Initial commit: Complete Raffine frontend"
git push -u origin main
```

## Daily Workflow

### Making Changes
```bash
# Check what files changed
git status

# Add specific files
git add src/components/Header.jsx

# Or add all changes
git add .

# Commit with descriptive message
git commit -m "Add mobile search functionality"

# Push to remote
git push
```

### Working with Team
```bash
# Pull latest changes
git pull

# Create feature branch
git checkout -b feature/new-feature

# Work on feature, then:
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# Create Pull Request on GitHub/GitLab
```

## Best Practices

1. **Commit Often**: Small, frequent commits are better
2. **Write Good Commit Messages**: 
   - "Fix login validation bug" ✅
   - "Update" ❌
3. **Pull Before Push**: Always pull latest changes first
4. **Use Branches**: Create branches for features/fixes
5. **Don't Commit**: node_modules, .env files, build folders

## Common Commands

```bash
# See commit history
git log

# See what changed
git diff

# Undo changes (before commit)
git checkout -- filename

# Create new branch
git checkout -b branch-name

# Switch branches
git checkout main

# Merge branch
git merge branch-name
```

## Quick Reference

```bash
# Initialize repository (do this once)
git init

# Check status
git status

# Add files
git add .

# Commit changes
git commit -m "Your commit message"

# Connect to remote (first time)
git remote add origin YOUR_REPO_URL

# Push to remote
git push -u origin main

# Pull latest changes
git pull

# Clone repository (for team members)
git clone YOUR_REPO_URL
cd raffine-frontend
npm install
npm run dev
```

