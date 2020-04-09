export default function generateDefaultTitle(projects) {
    if (!projects.get("untitled")) {
        return "untitled";
    }

    let n = 1;
    while (projects.get(`untitled-${n}`)) {
        n++;
    }

    return `untitled-${n}`;
}
