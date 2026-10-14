import { ref } from "vue";

const cache = new Map();

/**
 * fetch public metadata for a github repo
 * anonymous requests are rate-limited (60/h per ip), so falls back to static values when the api is unavailable
 */
export function useGithubRepo(fullName) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(true);

  const load = async () => {
    if (cache.has(fullName)) {
      data.value = cache.get(fullName);
      loading.value = false;
      return;
    }
    try {
      const [repoRes, prRes] = await Promise.all([
        fetch(`https://api.github.com/repos/${fullName}`, {
          headers: { Accept: "application/vnd.github+json" },
        }),
        fetch(
          `https://api.github.com/search/issues?q=repo:${fullName}+is:pr+is:open&per_page=1`,
          { headers: { Accept: "application/vnd.github+json" } },
        ),
      ]);
      if (!repoRes.ok) throw new Error(`GitHub API ${repoRes.status}`);
      const json = await repoRes.json();
      // open_issues_count on the repo endpoint includes pull requests, subtract open-PR count from the search api so "open issues" only counts issues
      const openPullRequests = prRes.ok
        ? ((await prRes.json()).total_count ?? 0)
        : 0;
      const rawOpen = json.open_issues_count ?? 0;
      const openIssues = prRes.ok
        ? Math.max(rawOpen - openPullRequests, 0)
        : rawOpen;
      const summary = {
        stars: json.stargazers_count,
        forks: json.forks_count,
        watchers: json.subscribers_count,
        openIssues,
        openPullRequests,
        language: json.language,
        pushedAt: json.pushed_at,
        defaultBranch: json.default_branch,
        license: json.license?.spdx_id ?? null,
        htmlUrl: json.html_url,
      };
      cache.set(fullName, summary);
      data.value = summary;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  load();

  return { data, error, loading };
}
