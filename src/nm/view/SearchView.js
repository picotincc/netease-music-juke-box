import View from "../../nju/view/View";
import ListView from "../../nju/view/ListView";

export default class SearchView extends View
{
    init()
    {
        super.init();
        this.addStyleClass("nm-search-view");

        this._text = null;
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
    }

    get text()
    {
        return this.$input.val();
    }

    set text(value)
    {
        this.$input.val(typeof(value) === "string" ? value.trim() : "");
    }

    get suggestList()
    {
        return this._suggestList;
    }

    set suggestList(value)
    {
        this.suggestView.items = value;
    }

    _initSuggestionView()
    {
        this.suggestionView = new ListView("suggest-view");
        this.suggestionView.addStyleClass("nm-suggest-view");
        this.addSubView(this.suggestionView);

    }

    search(text = this.text)
    {
        this.text = text;
        if (this.text !== "")
        {
            this.trigger("search");
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

}
