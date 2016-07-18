import ViewController from "../../nju/view/ViewController";

import SearchView from "../view/SearchView";
import ServiceClient from "../service/ServiceClient";

export default class SearchViewController extends ViewController
{
    createView(options)
    {
        return new SearchView("search-view");
    }

    initView(options)
    {
        super.initView(options);
        this.view.on("input", this._oninput.bind(this));
        this.view.on("focus", this._onfocus.bind(this));
        this.view.on("blur", this._onblur.bind(this));

        this.suggestionView = this.view.suggestionView;
        this.suggestionView.on("itemclick", this._suggestionView_onitemclick.bind(this));
    }

    async _oninput(e)
    {
        const keyword = this.view.text;
        try {
            if (keyword && keyword.trim() !== "")
            {
                const result = await ServiceClient.getInstance().search(keyword, true);
                this.view.suggestionList = result;
                this.view.toggleSuggestion(result && result.length > 0);
            }
        } catch (e) {
            console.log(e);
        }
    }

    _onfocus(e)
    {
        this.view.toggleSuggestion(this.view.text && this.view.suggestionList && this.view.suggestionList.length > 0);
    }

    _onblur(e)
    {
        this.view.hideSuggestion();
    }

    _suggestionView_onitemclick(e)
    {
        const keyword = e.parameters.item.name;
        this.view.search(keyword);
        this.view.hideSuggestion();
    }

}
