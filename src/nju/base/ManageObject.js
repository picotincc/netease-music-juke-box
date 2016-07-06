export default class ManageObject {
    constructor(id = null) {
        this._id = id;
        this._parent = null;
        this.init();
    }

    init() {

    }

    get id() {
        return this._id;
    }

    get parent() {
        return this._parent;
    }
}
