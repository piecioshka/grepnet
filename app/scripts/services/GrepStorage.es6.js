class GrepStorage {
    static save(name, item) {
        try {
            localStorage.setItem(name, JSON.stringify(item));
        } catch (ignore) {

            // Do nothing
        }
    }

    static load(name) {
        let item = null;

        try {
            item = JSON.parse(localStorage.getItem(name));
        } catch (ignore) {

            // Do nothing
        }

        return item;
    }
}

export default () => GrepStorage;
