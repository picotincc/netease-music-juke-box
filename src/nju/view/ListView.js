import View from "./View";

export default class ListView extends View
{
    init()
    {
        super.init();
        this._items = null;
        this._selection = null;
        this._$itemTemplates = [];
        this.addStyleClass("nju-list-view");

        this._initLayout();

        this.$container.on("click", this.getItemElementTag(), this._onclick.bind(this))
    }

    _initLayout()
    {

    }


    getElementTag()
    {
        return "ul";
    }

    getItemElementTag()
    {
        return "li";
    }

    get items()
    {
        return this._items;
    }
    set items(value)
    {
        const itemsLength = this.items !== null ? this.items.length : 0;
        this.clearItems();
        // this.addItems(value);

        if (value.length >= itemsLength)
        {
            const resetArr = value.splice(0, itemsLength);
            this.resetItems(resetArr);
            this.addItems(value);
        }
        else
        {
            this.removeItems(itemsLength - value.length);
            this.resetItems(value);
        }
    }

    get selection()
    {
        return this._selection;
    }
    set selection(value)
    {
        this.selectItem(value);
    }

    get selectedId()
    {
        return this.getIdOfItem(this.selection);
    }

    set selectedId(value = null)
    {
        if (value === null)
        {
            this.selection = null;
        }
        else
        {
            const $item = this.$getItem(value);
            if ($item.length > 0)
            {
                const item = $item.data("item");
                if (item)
                {
                    this.selection = item;
                }
            }
        }

    }

    getTypeOfItem(item)
    {
        return 0;
    }

    getIdOfItem(item)
    {
        if (item)
        {
            return item.id;
        }
        else
        {
            return null;
        }

    }




    removeItems(count)
    {
        const itemsDom = this.$container.children(this.getItemElementTag());
        while (count > 0)
        {
            $(itemsDom[count]).remove();
            count--;
        }
    }

    resetItems(items)
    {
        const itemsDom = this.$container.children(this.getItemElementTag());
        items.forEach((item, index) =>{
            this.items.push(item);
            this.renderItem(item, $(itemsDom[index]));
        });
    }

    clearItems()
    {
        this.selection = null;
        if (this._items !== null)
        {
            if(this._items.length > 0)
            {
                this._items.splice(0, this._items.length);
                //this.$container.children(this.getItemElementTag()).remove();
            }
        }
        else
        {
            this._items = [];
        }
    }

    addItems(items)
    {
        if (items && items.length)
        {
            items.forEach(item => {
                this.addItem(item);
            });
        }
    }

    addItem(item)
    {
        this.items.push(item);

        const $item = this.$createItem(this.getTypeOfItem(item));
        this.renderItem(item, $item);
        this.$container.append($item);
    }


    selectItem(item = null)
    {
        if (this.selection === item) return;

        if (this.selection !== null)
        {
            this.$getItem(this.selection).removeClass("selected");
            this._selection = null;
        }

        this._selection = item;

        if (item)
        {
            const $item = this.$getItem(item);
            $item.addClass("selected");
            //this.trigger("selectionchanged");
        }

        this.trigger("selectionchanged");
    }

    showSelection()
    {
        this.removeStyleClass("hide-selection");
    }

    hideSelection()
    {
        this.addStyleClass("hide-selection");
    }











    renderItem(item, $item)
    {
        $item.data("item", item);
        $item.attr("id", "i-" + this.getIdOfItem(item));
    }

    $createItem(itemType = 0)
    {
        if (!this._$itemTemplates[itemType])
        {
            this._$itemTemplates[itemType] = this.$createNewItem(itemType);
        }
        return this._$itemTemplates[itemType].clone();
    }


    $createNewItem(itemType = 0)
    {
        return $(`<${this.getItemElementTag()}/>`);
    }

    $getItem(item)
    {
        const id = this.getIdOfItem(item);
        return this.$container.children("#i-" + id);
    }



    _onclick(e)
    {
        const $item = $(e.currentTarget);
        const item = $item.data("item");
        this.selectItem(item);
    }
}
