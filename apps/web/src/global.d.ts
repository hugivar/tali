declare global {
    interface Window { TODOIST_CLIENT_ID: string; }
}

window.TODOIST_CLIENT_ID = window.TODOIST_CLIENT_ID || {};