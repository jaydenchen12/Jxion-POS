import {Component} from "@angular/core";
import {Events, NavController, NavParams, ViewController, PopoverController} from "ionic-angular";
import {UtilProvider} from "../../providers/util/util";
import {AddOnCostPage} from "../add-on-cost/add-on-cost"


@Component({
  selector: 'page-special-item-modal',
  templateUrl: 'special-item-modal.html',
})
export class SpecialItemModalPage {
  itemSel: any;
  importSizes = [];
  sizeSelect = [];
  sauces;
  actions;
  ingredientCategory;
  sauceSelect;
  categorySelect;
  actionSelect;
  ingredientCategorySelect;
  isSpecial:boolean = false;
  isChinese;
  isCustomCost:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public events: Events, private util: UtilProvider, public popoverCtrl: PopoverController) {
    this.isChinese = util.isChinese;
    util.getReq("addons/sauces")
      .then((json) => {
        this.sauces = json[0];
        this.sauces.unshift({sauceID: 0, enSauceTitle: "Filler", chSauceTitle: "Filler"});
        let defaultSauce = 1;
        this.sauceSelect = [defaultSauce,
          this.sauces[defaultSauce].enSauceTitle,
          this.sauces[defaultSauce].chSauceTitle];
        this.actions = json[1];
        this.actionSelect = [this.actions[0].actionID, this.actions[0].enActionTitle, this.actions[0].chActionTitle];
        this.ingredientCategory = json[2];
        this.categorySelect = this.ingredientCategory[0].ingredientCateItem;
        this.ingredientCategorySelect = [this.categorySelect[0].ingredientItemId, this.categorySelect[0].enIngredientItemTitle, this.categorySelect[0].chIngredientItemTitle];
      });
    this.itemSel = this.navParams.get('specialChoice');
    this.itemSel['defaultSauID'] = 1;
    this.importSizes.push({
      sizeID: 3,
      enSizeTitle: "Special One Size",
      chSizeTitle: "特别",
      sizeAbre: "O.S.",
      sizeValue: Number(this.itemSel.price).toFixed(2)
    });
    this.sizeSelect = [3, "O.S.", "特别", Number(this.itemSel.price)];
  }

  addonCosts = [
    {costID: 1, costTitle: "No Cost", costValue: 0},
    {costID: 2, costTitle: "$ 1", costValue: 1},
    {costID: 3, costTitle: "$ 2", costValue: 2},
    {costID: 4, costTitle: "$ 3", costValue: 3}];

  cateSelectID = 1;
  currentQuantityNumber = 1;
  costSelect = 1;
  costInput = 0;
  costSelectValue = 0;
  addOnCart = [];
  completeItem = [];
  pushToRice = false;
  pushToKitchen = false;

  ionViewDidLoad() {
    this.events.subscribe('price:added', (data) => {
      this.costInput = data;
      this.isCustomCost = true;
    });
  }
  addOnPopover(ev){
    let popover = this.popoverCtrl.create(AddOnCostPage);
    popover.present({
      ev: ev
    });
  }

  sizeSelected(size) {
    this.sizeSelect[0] = size.sizeID;
    this.sizeSelect[1] = size.sizeAbre;
    this.sizeSelect[2] = size.chSizeTitle;
    this.sizeSelect[3] = size.sizeValue;
  }

  sauceSelected(sauce) {
    this.sauceSelect[0] = sauce.sauceID;
    this.sauceSelect[1] = sauce.enSauceTitle;
    this.sauceSelect[2] = sauce.chSauceTitle;
  }

  actionSelected(action) {
    this.actionSelect[0] = action.actionID;
    this.actionSelect[1] = action.enActionTitle;
    this.actionSelect[2] = action.chActionTitle;
  }

  categorySelected(cate) {
    this.categorySelect = cate.ingredientCateItem;
    this.cateSelectID = cate.ingredientCateId;
    this.ingredientCategorySelect[0] = cate.ingredientCateItem[0].ingredientItemId;
    this.ingredientCategorySelect[1] = cate.ingredientCateItem[0].enIngredientItemTitle;
    this.ingredientCategorySelect[2] = cate.ingredientCateItem[0].chIngredientItemTitle;
  }

  ingredientSelected(cateItem) {
    this.ingredientCategorySelect[0] = cateItem.ingredientItemId;
    this.ingredientCategorySelect[1] = cateItem.enIngredientItemTitle;
    this.ingredientCategorySelect[2] = cateItem.chIngredientItemTitle;
  }

  costSelected(cost) {
    this.costSelect = cost.costID;
    this.costSelectValue = cost.costValue;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  addRequest() {
    if (this.cateSelectID == 1)
      this.pushToRice = true;
    if (this.cateSelectID == 5)
      this.pushToKitchen = true;
    let tempAddonCost;
    if (this.costInput > 0) {
      this.costSelectValue = this.costInput;
    }
    if (this.costSelectValue == 0) {
      tempAddonCost = null;
    } else {
      tempAddonCost = Number(this.costSelectValue).toFixed(2);
    }
    this.addOnCart.push({
      enActionTitle: this.actionSelect[1],
      chActionTitle: this.actionSelect[2],
      enIngredientItemTitle: this.ingredientCategorySelect[1],
      chIngredientItemTitle: this.ingredientCategorySelect[2],
      addonCost: tempAddonCost
    });
    this.costInput = 0;
    this.costSelect = 1;
    this.costSelectValue = 0;
    this.isCustomCost = false;
  }

  addItem() {
    if (this.itemSel.defaultSauID == this.sauceSelect[0]) {
      this.sauceSelect[0] = null;
    }
    if (this.pushToRice == true)
      this.itemSel.pushToRice = 1;
    if (this.pushToKitchen == true)
      this.itemSel.pushToKitchen = 1;
    if (this.isSpecial) {
      this.completeItem.push({
        menuItemId: this.itemSel.itemId,
        enMenuItemTitle: this.itemSel.enMenuItemTitle + " " + this.sizeSelect[1],
        chMenuItemTitle: this.itemSel.chMenuItemTitle,
        quantityValue: this.currentQuantityNumber,
        sizeID: this.sizeSelect[0],
        sizeAbre: "",
        chSizeTitle: this.sizeSelect[2],
        sizeValue: this.sizeSelect[3],
        sauceID: this.sauceSelect[0],
        enSauceTitle: this.sauceSelect[1],
        chSauceTitle: this.sauceSelect[2],
        pushToKitchen: this.itemSel.pushToKitchen,
        pushToFryer: this.itemSel.pushToFryer,
        pushToRice: this.itemSel.pushToRice
      });
    } else {
      this.completeItem.push({
        menuItemId: this.itemSel.itemId,
        enMenuItemTitle: this.itemSel.enMenuItemTitle,
        chMenuItemTitle: this.itemSel.chMenuItemTitle,
        quantityValue: this.currentQuantityNumber,
        sizeID: this.sizeSelect[0],
        sizeAbre: this.sizeSelect[1],
        chSizeTitle: this.sizeSelect[2],
        sizeValue: this.sizeSelect[3],
        sauceID: this.sauceSelect[0],
        enSauceTitle: this.sauceSelect[1],
        chSauceTitle: this.sauceSelect[2],
        pushToKitchen: this.itemSel.pushToKitchen,
        pushToFryer: this.itemSel.pushToFryer,
        pushToRice: this.itemSel.pushToRice
      });
    }
    this.completeItem.push(this.addOnCart);
    this.events.publish('item:added', this.completeItem);
    console.log('itemPushed', this.completeItem);
    this.viewCtrl.dismiss();
  }

  removeItem(item) {
    let index = this.addOnCart.indexOf(item);

    if (index > -1) {
      setTimeout(() => this.addOnCart.splice(index, 1), 200);
    }
    else {
      console.log("Could not find item:\t", item);
    }
  }

  increment() {
    this.currentQuantityNumber++;
  }

  decrement() {
    if (this.currentQuantityNumber > 1) {
      this.currentQuantityNumber--;
    }

  }
}
