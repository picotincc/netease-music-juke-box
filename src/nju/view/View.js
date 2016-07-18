import ManageObject from "../base/ManageObject";

export default class View extends ManageObject
{

    init()
    {
        super.init();
        this._subviews = [];
        this.$element = $(`<${this.getElementTag()}/>`);
        if (this.id !== null)
        {
            this.$element.attr("id", this.id);
        }
        this.$container = this.$element;
    }

    getElementTag()
    {
        return "div";
    }

    get subviews()
    {
        return this._subviews;
    }


    addStyleClass(...args)
    {
        this.$element.addClass(...args);
    }

    removeStyleClass(...args)
    {
        this.$element.removeClass(...args);
    }

    toggleStyleClass(...args)
    {
        this.$element.toggleClass(...args);
    }



    addSubView(view, $container = this.$container)
    {
        if (view instanceof View)
        {
            if (view.parent)
            {
                view.removeFromParenet();
            }
            view._parent = this;
            this._subviews.push(view);
            view.placeAt($container);
        }
    }

    addSubViews(views, $container = this.$container)
    {
        if (Array.isArray(views))
        {
            views.forEach((view) => {
                this.addSubView(view, $container);
            });
        }
    }

    removeSubView(view, neverUseAgain = false)
    {
        const index = this.subviews.indexOf(view);
        if (index !== -1)
        {
            view._parent = null;
            this.subviews.splice(index, 1);
            if (neverUseAgain)
            {
                view.$element.remove();
            }
            else
            {
                view.$element.detach();
            }
        }
    }

    removeAllSubviews(neverUseAgain = false)
    {
        while (this.subviews.length > 0)
        {
            this.removeSubView(this.subviews[0], neverUseAgain);
        }
    }

    removeFromParenet()
    {
        if (this.parent)
        {
            this.parent.removeSubView(this);
        }
    }

    placeAt(target)
    {
        const $target = (target instanceof jQuery ? target : $(target));
        $target.append(this.$element);
    }


    $(...args)
    {
        return this.$element.find(...args);
    }
}
