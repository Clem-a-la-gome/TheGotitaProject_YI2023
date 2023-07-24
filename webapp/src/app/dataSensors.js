export const data_all = (docs_all) => {
    docs_all.forEach(doc => {
        const id = doc.data().id
        data_all.push(doc.data())
})}


export function getById(id, data_all) {
    var results = data_all.filter(function(x) { return x.id == id });
    return (results.length > 0 ? results[0] : null);
}
