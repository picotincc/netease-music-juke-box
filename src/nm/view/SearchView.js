import View from "../../nju/view/View";

export default class SearchView extends View
{
    init()
    {
        super.init();
        this.addStyleClass("nm-search-view");

        this.$element.append(`<span class="icon iconfont icon-search"/>`);
        this.$input = $(`<input type=search placeholder="搜索音乐">`);
        this.$element.append(this.$input);

        this.$element.on("keydown", this._onkeydown.bind(this));
        this.$element.on("click", "span.icon", this._icon_onclick.bind(this));
    }

    get text()
    {
        return this.$input.val();
    }

    set text(value)
    {
        this.$input.val(typeof(value) === "string" ? value.trim() : "");
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
