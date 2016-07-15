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

        this.suggestionListView = this.view.suggestionListView;
    }
}
