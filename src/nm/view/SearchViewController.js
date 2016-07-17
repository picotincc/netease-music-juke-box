import ViewController from "../../nju/view/ViewController";

import SearchView from "../view/SearchView";

export default class SearchViewController extends ViewController
{
    createView(options)
    {
        return new SearchView("search-view");
    }

    initView(options)
    {
        super.initView(options);
        this.view.on("input",this._oninput.bind(this));
        this.suggestionListView = this.view.suggestionListView;
    }

    async _oninput(e)
    {
        console.log(this.view.text);
    }
}
