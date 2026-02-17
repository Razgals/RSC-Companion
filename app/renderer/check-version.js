// This script fetches the remote version.json from GitHub and compares it to the local version.json
// If the remote version is higher, it prompts the user to download the latest release.

const LOCAL_VERSION = '0.2.0'; // Keep in sync with your package.json
const LOCAL_VERSION_PATH = 'version.json';
const REMOTE_VERSION_URL = 'https://raw.githubusercontent.com/LostHQ/rsc-lostkit-electron-ts/main/app/renderer/version.json';

function compareVersions(a, b) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const na = pa[i] || 0, nb = pb[i] || 0;
    if (na > nb) return 1;
    if (na < nb) return -1;
  }
  return 0;
}

async function checkForUpdate() {
  try {
    const local = await fetch(LOCAL_VERSION_PATH).then(r => r.json());
    const remote = await fetch(REMOTE_VERSION_URL).then(r => r.json());
    if (compareVersions(remote.version, local.version) > 0) {
      const releaseUrl = remote.releaseUrl || 'https://github.com/LostHQ/rsc-lostkit-electron-ts/releases';
      const msg = `A new version (${remote.version}) is available!\n\nGo to the release page?`;
      if (confirm(msg)) {
        window.api.openWindow(releaseUrl, 'Update Available');
      }
    }
  } catch (e) {
    // Ignore errors
  }
}

checkForUpdate();
