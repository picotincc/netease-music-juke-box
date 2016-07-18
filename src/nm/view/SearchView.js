import View from "../../nju/view/View";
import ListView from "../../nju/view/ListView";

export default class SearchView extends View
{
    init()
    {
        super.init();
        this.addStyleClass("nm-search-view");

        this._text = null;
        this.__suggestionList = null;
        this.$element.append(`<span class="icon iconfont icon-search"/>`);
        this.$input = $(`<input type=search placeholder="搜索音乐">`);
        this.$element.append(this.$input);

        this.$element.on("keydown", this._onkeydown.bind(this));
        this.$element.on("click", "span.icon", this._icon_onclick.bind(this));

        this._initSuggestionView();

        let inputDelay = null;

        this.$input.on("input", () => {
            if (inputDelay !== null)
            {
                window.clearTimeout(inputDelay);
                inputDelay = null;
            }
            inputDelay = window.setTimeout(() => {
                this.trigger("input");
            }, 300);
        });
        this.$input.on("focus", () => {
            this.trigger("focus");
        });
        this.$input.on("blur", () => {
            this.trigger("blur");
        });
    }

    get text()
    {
        return this.$input.val();
    }

    set text(value)
    {
        this.$input.val(typeof(value) === "string" ? value.trim() : "");
    }

    get suggestionList()
    {
        return this._suggestionList;
    }

    set suggestionList(value)
    {
        if (value)
        {
            this.suggestionView.items = value;
        }
        this._suggestionList = value;
    }

    _initSuggestionView()
    {
        this.suggestionView = new ListView("suggest-view");
        this.suggestionView.addStyleClass("nm-suggest-view");
        this.addSubView(this.suggestionView);
        this.hideSuggestion();
        this.suggestionView.renderItem = this._suggestionView_renderItem.bind(this.suggestionView);
        this.suggestionView.$container.on("mousedown", this.suggestionView.getItemElementTag(), this._suggestionView_onitemclick.bind(this.suggestionView));
    }

    search(text = this.text)
    {
        this.text = text;
        if (this.text !== "")
        {
            console.log(this.text);
            this.trigger("search");
        }
    }

    showSuggestion()
    {
        this.suggestionView.$element.show();
    }

    hideSuggestion()
    {
        this.suggestionView.$element.hide();
    }

    toggleSuggestion(shown)
    {
        if (shown)
        {
            this.showSuggestion();
        }
        else
        {
            this.hideSuggestion();
        }
    }

    _onkeydown(e)
    {
        if (e.keyCode === 13)
        {
            this.search();
        }
    }

    _icon_onclick(e)
    {
        this.search();
    }

    _suggestionView_renderItem(item, $item)
    {
        $item.data("item", item);
        $item.text(item.name);
    }

    _suggestionView_onitemclick(e)
    {
        const $item = $(e.currentTarget);
        const item = $item.data("item");
        this.trigger("itemclick", { item });
    }

}
