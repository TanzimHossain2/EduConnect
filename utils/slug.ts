export const getSlug  = (title: string) => {
    if(!title) return null;

    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    return slug;
}