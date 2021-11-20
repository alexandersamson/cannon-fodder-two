import {InventorySlot} from "./inventory-slot";
import {Item} from "../items/item";
import {EmptySlot} from "../items/empty-slot";
import {Sprite} from "../sprites/sprite";
import {GameContainer} from "../gameplay/game-container";

export class Inventory extends Item{
  maxSlots: number; //Amount of slots (space) available to hold items and stacks of items.
  maxTotalWeight: number; //In kilos. Max weight of the whole inventory content.
  maxItemWeight: number; //Ìn kilos. per individual item to be inserted
  maxItemStackSize: number; //For specific ammo magazines etc.
  canProvideItems: boolean; //Can players take anything from this inventory?
  canTakeInItems: boolean; //Can players drop anything in this inventory?
  isOpen: boolean; //Has the inventory item been opened? Mainly used for cosmetics (like displaying an open chest instead of a closed one)
  removesWhenEmpty: boolean; //For npc-loot etc.
  isLocked: boolean; //Is this inventory currently locked? This means the player cannot access its contents.
  canPeekWhileLocked: boolean; //Can players see the content, even though it's locked?
  possibleKeys: Array<Item>; //Which keys allow for opening of this inventory
  neededKeysAmount: number //How many of the possible keys are needed to unlock this inventory?
  consumesKeys: boolean;   //If set to true this inventory will consume the needed amount of keys needed for unlock.
  inventoryItems: Array<InventorySlot>;
  allowAllItems: boolean; //If set to false, only the items stated in allowedItems[] will be allowed to be inserted.
  allowedItems: Array<Item>;
  showContentsText: Boolean; //Show a list of its contents on the canvas, above or besides the chest?

  constructor(slots: number = 10, sprite: Sprite | undefined = undefined) {
    super(sprite);
    this.lifeProperties.invulnerable = false;
    this.type = 'Inventory';
    this.name = 'Inventory Item';
    this.title = 'Inventory';
    this.descriptionBuy = 'Inventory item. It will grant extra inventory slots to the assigned unit.';
    this.description = 'Inventory item. It will grant extra inventory slots to the assigned unit.';
    this.maxSlots = slots;
    this.maxTotalWeight = 10;
    this.maxItemWeight = 10;
    this.maxItemStackSize = 1000; // 1000 is generic
    this.inventoryItems = [];
    this.canBePickedUp = false;
    this.canProvideItems = true;
    this.canTakeInItems = true;
    this.isOpen = false;
    this.removesWhenEmpty = false;
    this.isLocked = false;
    this.canPeekWhileLocked = false;
    this.possibleKeys = [];
    this.neededKeysAmount = 1;
    this.consumesKeys = false;
    this.allowAllItems = true; //if set to true, only items listed in allowedItems
    this.allowedItems = [];
    this.showContentsText = false;
    this.prepareEmptySlots(); //fill up the inventory with empty slots
  }

  protected prepareEmptySlots(){
    for(let i=0;i<this.maxSlots;i++){
      this.inventoryItems.push(new InventorySlot());
    }
  }

  public itemIsAllowed<T extends Item>(item: T):boolean{
    if(this.allowAllItems){
      return true;
    }
    if(this.allowedItems && this.allowedItems.length < 1){
      //console.log("Inventory cannot hold any items: 'allowAllItems' set to false, but no items in 'allowedItems'.")
      return false;
    }
    for(const allowedItem of this.allowedItems){
      if (item instanceof allowedItem.constructor){
        return true;
      }
    }
    return false;
  }

  //When slots are empty, this method needs to be called on that slot
  insertEmpty(inventory: Inventory, position: number){
    inventory.inventoryItems[position] = new InventorySlot(new EmptySlot());
  }

  //This method tries to insert an entire stack of items in the bag.
  //When everything fits, it will return a slot containing an 'Empty Item' object with the amount of 1.
  //If not everything fits, but some do, it will return the item with the adjusted amount.
  //This adjusted amount is equal to the provided amount minus what did fit in this bag.
  //If the insert is prematurely rejected, the original item (and it's unchanged amount) will be returned.
  public insertItemStack(itemObject:Item | InventorySlot):InventorySlot{
    //1. Check if any of the items will fit
    let amountThatFit = this.getAmountOfItemsThatFitInInventory(itemObject); //Get the amount of provided items that should fit in this bag
    if(amountThatFit < 1) return this.parseItemIntoSlot(itemObject); //If nothing fits or is rejected (returns also 0), just return the original object

    //2. Get the item out of the slot, if a slot was provided and check if there's actual an amount set on the item
    let item = this.parseSlotIntoItem(itemObject);
    if(item.amount < 1) return this.parseItemIntoSlot(itemObject); //If the item is not containing any amount, just reject insertion and return it.
    //console.log("insertItemStack# item: "+item.name + " (" + item.amount+ ")");

    //3A. We need an amount to insert. This is either the amountThatFit or the item.amount. The lowest of these two is the amount that needs to be inserted.
    let amountToInsert = Math.min(amountThatFit, item.amount);
    //console.log("insertItemStack# amountToInsert: "+amountToInsert);

    //3B. This buffer will be used to compare the actual amount inserted to the original amount.
    //So we know how much actually is inserted in the end
    let amountToInsertBuffer = amountToInsert;

    //4. let's get the max stack size for this inventory with the provided item.
    let maxCalculatedStackSize = Math.min(item.maxStackSize, this.maxItemStackSize);

    //4. First we are going to try to top off existing stacks of the same item.
    //So not every time a new stack will be created in the bag, when there's room left on existing item stacks
    let sameItemsArray = this.getItemSlotsByItemTypeArray(item);
    if(sameItemsArray.length > 0){
      //While there still items left that will
      for(let sameItem of sameItemsArray){
        if(sameItem.item.amount < maxCalculatedStackSize){
          let adjustAmount = Math.min(amountToInsert, (maxCalculatedStackSize - sameItem.item.amount))
          sameItem.item.amount += adjustAmount;
          amountToInsert -= adjustAmount;
        }
        if(amountToInsert < 1){
          item.amount -= amountToInsertBuffer - amountToInsert;
          if(item.amount > 0){
            return new InventorySlot(item); //everything is inserted what could be inserted, but there are items left on the original stack, return those.
          }
          return new InventorySlot(new EmptySlot()); //everything has been inserted on existing stacks, return the empty slot
        }
      }
    }

    //5. At this point there are still items left to be inserted, but there are no available stacks to top off.
    //We need to use free slots to further insert our stack of the provided item.
    let freeSlotsIndexes = this.getFreeSlotsIndexes();
    //console.log(freeSlotsIndexes);
    for(let slotIndex of freeSlotsIndexes){
      //A. Create the new item to insert
      let itemCopy: Item = Object.create(item);
      itemCopy = Object.assign(itemCopy, item)
      //B. Pack it in a slot and insert it
      this.inventoryItems[slotIndex] = new InventorySlot(itemCopy);
      //console.log(slotIndex);
      //C. Set the correct amounts
      let setAmount = Math.min(amountToInsert, maxCalculatedStackSize);
      itemCopy.amount = setAmount;
      amountToInsert -= setAmount;
      if(amountToInsert < 1){
        item.amount -= amountToInsertBuffer - amountToInsert;
        if(item.amount > 0){
          return new InventorySlot(item); //everything is inserted what could be inserted, but there are items left on the original stack, return those.
        }
        return new InventorySlot(new EmptySlot()); //everything has been inserted on new slots, no items left in source stack, so return the empty slot
      }
    }

    //6. If the code reaches here, it means not everything did fit. We need to return the item with the adjusted amount.
    item.amount -= amountToInsertBuffer - amountToInsert;
    return this.parseItemIntoSlot(item);
  }


  //This method is used to insert items in any inventory.
  //It returns the actual inserted amount of items
  public insertItem<T extends Item>(
    itemToInsert: T,
    amount: number = 0,
    sourceInventory: Inventory | undefined = undefined,
    sourceInventorySlotIndex: number | undefined = undefined,
    targetInventory: Inventory | undefined = undefined):number
  {
    if (!itemToInsert.isItem || !itemToInsert.canBePickedUp || itemToInsert.weight > this.maxItemWeight || itemToInsert.amount < 1) {
      return 0;
    }
    if(!targetInventory){
      targetInventory = this;
    }
    let actualItemsInInventory = targetInventory.inventoryItems.filter(x => {
      return !x.item.isAvailableSlot;
    })

    //AMOUNTS
    let itemsLeftToInsert = itemToInsert.amount;
    if(amount > 1){
      if(amount > itemsLeftToInsert){
        console.log("Requested "+amount+" to be inserted. Only "+itemToInsert.amount+" left. Trying to insert this amount...");
      } else {
        itemsLeftToInsert = amount; //We acutally need less items to be transferred than there are provided.
      }
    }

    //WEIGHT
    let currentInventoryWeight = 0;
    let totalItemWeight = itemToInsert.amount * itemToInsert.weight;
    actualItemsInInventory.forEach(x => {
      currentInventoryWeight += x.item.amount * x.item.weight;
    })
    // console.log("INSERTION>>>>>>>>>>>>>>>>>>>>>>>>>>");
    // console.log(actualItemsInInventory);
    // console.log("Item to insert: "+itemToInsert.name+". Amount requested: "+itemsLeftToInsert+ ". Available in this stack: "+itemToInsert.amount);
    // console.log("itemsLeftToInsert: "+itemsLeftToInsert);
    // console.log("totalItemWeight: "+totalItemWeight);
    // console.log("currentInventoryWeight: "+currentInventoryWeight);
    if((currentInventoryWeight + totalItemWeight) > targetInventory.maxTotalWeight){
      //ex:
      //10kg - 7,6kg - 3.6kg
      //3.6kg / 7kg = 0,50...
      //100 items * 0,50 = 50 items left to insert
      itemsLeftToInsert = Math.floor(itemsLeftToInsert * ((targetInventory.maxTotalWeight - currentInventoryWeight) / totalItemWeight));
      //console.log("Too heavy, trying to strip off items");
      if(itemsLeftToInsert < 1){
        //console.log("Cannot fit any item in this inventory: Too heavy.");
        return 0;
      }
      //console.log("itemsLeftToInsert after stripping heavy: "+itemsLeftToInsert);
      //console.log("totalItemWeight: "+(itemToInsert.weight * itemsLeftToInsert));
    }

    //CHECK FOR EXISTING STACKS ON THE TARGET INVENTORY TO TOP OFF WITH STACKSIZE LEFT
    let inserted = 0;
    for(const [key, targetInventorySlot] of Object.entries(targetInventory.inventoryItems)){
      if((targetInventorySlot.item instanceof itemToInsert.constructor) && (targetInventorySlot.item.amount < targetInventorySlot.item.maxStackSize)){
        let amountOfItemsToAddToStack = targetInventorySlot.item.maxStackSize - targetInventorySlot.item.amount;
        if(itemsLeftToInsert > amountOfItemsToAddToStack){
          //Do a simple trading of amounts. No need to copy objects and such.
          itemsLeftToInsert -= amountOfItemsToAddToStack;
          targetInventorySlot.item.amount += amountOfItemsToAddToStack;
          itemToInsert.amount -= amountOfItemsToAddToStack;
          inserted += amountOfItemsToAddToStack;
          //console.log(">>>>>Passing condition 1");
        } else {
          targetInventorySlot.item.amount += itemsLeftToInsert;
          itemToInsert.amount -= itemsLeftToInsert;
          inserted += itemsLeftToInsert;
          itemsLeftToInsert = 0;
          //console.log(">>>>>Passing condition 2");
        }
        if(sourceInventory && sourceInventorySlotIndex !== undefined && itemToInsert.amount < 1){
          sourceInventory.resetSlotIfEmpty(sourceInventorySlotIndex)
        }
      }
    }
    if(itemsLeftToInsert < 1){
      return inserted;
    }

    //SLOTS
    let slotsNeeded = Math.ceil(itemsLeftToInsert / itemToInsert.maxStackSize);
    let slotsLeft = targetInventory.maxSlots - actualItemsInInventory.length;
    // console.log("item.maxStackSize: "+itemToInsert.maxStackSize);
    // console.log("slotsNeeded: "+slotsNeeded);
    // console.log("slotsLeft: "+slotsLeft);
    while(slotsLeft < slotsNeeded){
      console.log('Too many slots needed. Stripping...')
      if(itemsLeftToInsert % itemToInsert.maxStackSize !== 0){
        itemsLeftToInsert -= itemsLeftToInsert % itemToInsert.maxStackSize;
      } else {
        itemsLeftToInsert -= itemToInsert.maxStackSize;
      }
      slotsNeeded--;
    }

    //INSERTION
    let maxIterations = 500;
    while(itemsLeftToInsert > 0 && maxIterations > 0){
      maxIterations--;
      if(maxIterations === 0){
        console.log("INVENTORY.TS | INSERTITEM: something went wrong with insertion: Too many iterations");
        break;
      }
      let insertAmount = itemsLeftToInsert > itemToInsert.maxStackSize ? itemToInsert.maxStackSize : itemsLeftToInsert;
      itemsLeftToInsert -= insertAmount;
      //Find nice, empty array (inventory) location to put in the object
      let insertIndex = targetInventory.inventoryItems.findIndex(x => {
        return x.item.isAvailableSlot;
      });
        //Create a copy of the item, adjust the amount and put it into a new Inventory Slot
      let newItem = <T>Object.create(itemToInsert);
      Object.assign(newItem, itemToInsert);
      newItem.amount = insertAmount;
        //insert a new inventory slot, containing the item at array index in the selected inventory
      targetInventory.inventoryItems[insertIndex] = new InventorySlot(newItem);
      itemToInsert.amount -= insertAmount;
      inserted += insertAmount;
    }
    if(sourceInventory && sourceInventorySlotIndex !== undefined && itemToInsert.amount < 1){
      console.log("SLOTINDEX: "+sourceInventorySlotIndex);
      sourceInventory.resetSlotIfEmpty(sourceInventorySlotIndex)
    }

    console.log("itemsLeftToInsert: "+itemsLeftToInsert);
    console.log("slotsNeeded: "+slotsNeeded);
    console.log("slotsLeft: "+slotsLeft);
    console.log("SUCCESS: inserted " +inserted+ " items ["+itemToInsert.name+"]! Items left in stack: " + itemToInsert.amount);
    console.log(targetInventory.inventoryItems);
    console.log(itemToInsert);
    return inserted;
  }

  //Sets the slot at given index to hold an item called 'Empty Slot', which has the 'isAvailableSlot' property.
  //Does a content-check. If there's an item with an amount of >1, it will not write over the slot
  //Use resetSlot(), if this safety check is NOT needed.
  resetSlotIfEmpty(itemSlotIndex:number){
    if(this.inventoryItems[itemSlotIndex] && this.inventoryItems[itemSlotIndex].item.amount < 1){
      this.inventoryItems[itemSlotIndex].item = new EmptySlot();
    }
  }

  //Sets the slot at given index to hold an item called 'Empty Slot', which has the 'isAvailableSlot' property.
  //Doesn't check the target slot. If there's an item in there, it will get written over.
  //Use resetSlotIfEmpty(), if this safety check is needed.
  resetSlot(itemSlotIndex:number){
    this.inventoryItems[itemSlotIndex].item = new EmptySlot();
  }


  acquireAllItemsFromInventory(sourceInventory: Inventory){
    if(sourceInventory.getItemSlotsAmount() < 1 || !this.canTakeInItems || !sourceInventory.canProvideItems){
      console.log("Cannot transfer items. Either the source invetory is empty, is not allowed to provide items, or the target inventory cannot take items.")
      return;
    }
    Object.entries(sourceInventory.inventoryItems).forEach(([key, itemSlot]) => {
      this.transferItemToThisInventory(sourceInventory, itemSlot, parseInt(key))
    })
  }


  //TODO: remake this method using the new insert method
  transferItemToThisInventory(sourceInventory: Inventory, itemSlot: InventorySlot, itemSlotIndex: number){
    this.insertItem(itemSlot.item, itemSlot.item.amount, sourceInventory, itemSlotIndex)
  }

  getItemSlotsAmount():number{
    return this.getItemSlotsArray().length
  }

  getFreeSlotsAmount():number{
    return this.getFreeSlotsArray().length;
  }

  //Returns the actual physical items in this bag
  getItemSlotsByItemTypeArray<T extends Item>(item:T):Array<InventorySlot>{
    if(this.inventoryItems && this.inventoryItems.length > 0){
      return this.inventoryItems.filter(slotItem => {
        return (!slotItem.item.isAvailableSlot && slotItem.item instanceof item.constructor)
      });
    }
    return [];
  }

  //Returns the actual physical items in this bag
  getItemSlotsByItemTypeIndexes<T extends Item>(item:T):Array<number>{
    let indexes: Array<number> = []
    if(this.inventoryItems && this.inventoryItems.length > 0){
      this.inventoryItems.forEach((slotItem, index) => {
        if (!slotItem.item.isAvailableSlot && !slotItem.blocked && slotItem.item instanceof item.constructor){
          indexes.push(index)
        }
      });
    }
    return indexes;
  }

  //Returns the actual physical items in this bag
  getItemSlotsArray():Array<InventorySlot>{
    if(this.inventoryItems && this.inventoryItems.length > 0){
      return this.inventoryItems.filter(slotItem => {
        return !slotItem.item.isAvailableSlot
      });
    }
    return [];
  }

  //Returns an array with inventorySlot array, containing the ones holding an item classified as 'isAvailableSlot'
  //Essentially the free slots of the inventory. Excludes blocked slots, since they are not available anyhow.
  getFreeSlotsArray():Array<InventorySlot>{
    if(this.inventoryItems && this.inventoryItems.length > 0){
      return this.inventoryItems.filter((slotItem, index) => {
        return (slotItem.item.isAvailableSlot && !slotItem.blocked)
      });
    }
    return [];
  }

  //Returns an array with inventorySlot array indexes, containing the ones holding an item classified as 'isAvailableSlot'
  //Essentially the free slots of the inventory. Excludes blocked slots, since they are not available anyhow.
  getFreeSlotsIndexes():Array<number>{
    let indexes: Array<number> = []
    if(this.inventoryItems && this.inventoryItems.length > 0){
      this.inventoryItems.forEach((slotItem, index) => {
        if (slotItem.item.isAvailableSlot && !slotItem.blocked){
          indexes.push(index)
        }
      });
    }
    return indexes;
  }

  //Returns the current inventory holding weight.
  getCurrentInventoryWeight(): number{
    let itemSlots = this.getItemSlotsArray();
    if(itemSlots.length < 1) return 0; //if there are no items in this inventory, it's easy, just return 0
    let weight: number = 0;
    itemSlots.forEach(itemSlot => {
      weight += (itemSlot.item.weight * itemSlot.item.amount);
    });
    return weight;
  }

  //Get the max weight left in this bag
  getMaxInventoryWeightLeft(): number{
    return this.maxTotalWeight - this.getCurrentInventoryWeight()
  }

  //This method checks how many of an item in an inventory can be added to fill up the stack,
  //saturates the inventory max stack size or caps the (optional) provided source item amount.
  //The method simply returns the lowest amount among the possible limiting factors (Math.min method)
  //inventory = the inventory the item is in to be checked.
  //itemSlotIndex = the index of this item.
  //sourceItem = an optional item to bring in it's amount into the calculation. Also an amount (number) can be provided.
  getMaxTopOffAmountForItemInInventory(inventory: Inventory, itemSlotIndex:number, sourceItem: Item | number | undefined = undefined){
    if(
      !inventory.inventoryItems ||
      inventory.inventoryItems.length < 1 ||
      !inventory.inventoryItems[itemSlotIndex] ||
      !inventory.canTakeInItems ||
      inventory.inventoryItems[itemSlotIndex].item.isAvailableSlot ||
      inventory.inventoryItems[itemSlotIndex].blocked
    ){
      return 0
    }
    let item = inventory.inventoryItems[itemSlotIndex].item;
    let sourceItemCanProvide: number = 0;
    //If there's a source item provided, make sure we know its amount.
    if(sourceItem instanceof Item){
      sourceItemCanProvide = sourceItem.amount
    } else if(typeof sourceItem === "number") {
      sourceItemCanProvide = sourceItem;
    } else{
      sourceItemCanProvide = item.maxStackSize; // Cheap hack to use the same Math.min() method.
    }
    //Get the lowest amount of items that can be transferred
    let topOffAmount: number = Math.min(
      item.maxStackSize - item.amount,
      inventory.maxItemStackSize - item.amount,
      sourceItemCanProvide
    )
    return topOffAmount;
  }

  //Pushes an inventory slot into an item , or just returns the item if a item is provided
  parseSlotIntoItem(itemObject: Item | InventorySlot): Item{
    if(itemObject instanceof InventorySlot) return itemObject.item //If already a slot, just return the slot.
    return itemObject; //If not already a slot, then instantiate one and put the item in there
  }

  //Pushes an item into an inventory slot, or just returns the slot if a slot is provided
  parseItemIntoSlot(itemObject: Item | InventorySlot): InventorySlot{
    if(itemObject instanceof InventorySlot) return itemObject //If already a slot, just return the slot.
    return new InventorySlot(itemObject); //If not already a slot, then instantiate one and put the item in there
  }


  //Returns a boolean stating if this bag is allowed to take in the item. This method does not check slotsize and weight.
  //In order to do a full check and return the max amount of items that will fit, use: getAmountOfItemsThatFitInInventory()
  getIsAllowedToTakeInItem(itemObject: Item | InventorySlot): boolean{
    //1. First check if we're dealing with an Item or an ItemSlot. If it's a slot, we need to check if it's blocked or not.
    if(itemObject instanceof InventorySlot) {
      if (itemObject.blocked) return false; //This slot is blocked, so we cannot do antything with it anyhow. Return 0
    }

    //2. Extract the item out of the slot, if any.
    let item: Item = this.parseSlotIntoItem(itemObject)

    //3. Then check if this bag allows any items at all and if the bag allows this item
    if(!this.inventoryItems.length) return false; //This bag does not have any slots, so nothing can be inserted anyhow
    if(!this.getFreeSlotsAmount() && !this.getItemSlotsAmount()) return false; //This bag only has blocked slots, since there are inventory slots, but no items and also no free space
    if(!this.canTakeInItems) return false; //This bag does not take any number of items
    if(this.isLocked) return false; //A locked bag cannot take in any items
    if(!this.allowAllItems && !this.itemIsAllowed(item)) return false; //This item is not allowed in this bag
    if(!item.canBeStashed) return false; //This item cannot be stashed in any inventory. So, no effort trying to insert it.
    if(item.amount < 0) return false; //There's not actual item to work with.
    return true; //When all these guard conditions are passed, we can finally okay this insertion
  }

  //returns the amount of items that can be pushed into the inventory of a given type.
  //It compares all insertion requirements, max weight and max slot/stack size and returns the lowest possible amount.
  //This lowest amount is the max item count of the provided item type that will fit in this inventory
  getAmountOfItemsThatFitInInventory(itemObject: Item | InventorySlot): number {
    //1. First some pre-validation in order to proceed. Also extract the item from the inventory slot if a slot was provided
    if (!this.getIsAllowedToTakeInItem(itemObject)) return 0
    //console.log("getAmountOfItemsThatFitInInventory# passed first guard");
    let item = this.parseSlotIntoItem(itemObject);
    //console.log("getAmountOfItemsThatFitInInventory# item: " + item.name + " (" + item.amount + ")");

    //2. set the maxAmounts array. In this Array all the found max amounts will be pushed.
    //In the end this array will be Math.min(...array) to extract the actual max intake amount for the provided item type in this inventory
    let maxAmounts: number[] = [];

    //3. Check the slots. This is a special case, because we need to check if an item of the provided item type already exists in the bag.
    //If it already exists, it is maybe possible to top off stacks of already inserted items with items of the provided type.
    let maxCalculatedStackSize = Math.min(item.maxStackSize, this.maxItemStackSize);
    //console.log("getAmountOfItemsThatFitInInventory# maxCalculatedStackSize: " + maxCalculatedStackSize);
    let amountBySlotSpace = this.getFreeSlotsAmount() * Math.min(item.maxStackSize, this.maxItemStackSize);
    if(maxCalculatedStackSize > 1 ) {
      let itemSlotsOfThisTypeAlreadyInBag = this.getItemSlotsByItemTypeArray(item);
      if (itemSlotsOfThisTypeAlreadyInBag.length > 0) {
        itemSlotsOfThisTypeAlreadyInBag.forEach(itemSlot => {
          //console.log("getAmountOfItemsThatFitInInventory# forEach>itemSlot: " + itemSlot.item.name + " (" + itemSlot.item.amount + ")");
          let freeStackSpace = (maxCalculatedStackSize - itemSlot.item.amount > 0) ? (maxCalculatedStackSize - itemSlot.item.amount) : 0;
          amountBySlotSpace += freeStackSpace ;
        })
      }
    }
    if(amountBySlotSpace < 1) return 0; //If there's no space left at all, just return 0.
    maxAmounts.push(amountBySlotSpace);

    //4. Check the weight
    if (item.weight > this.maxItemWeight) return 0; //If a single item is too heavy for the bag, none will fit anyhow.
    let amountByWeight = Math.floor(this.getMaxInventoryWeightLeft() / item.weight);
    if(amountByWeight < 1) return 0; //If a single item burdens the bag max weight already, we can early return with 0
    maxAmounts.push(amountByWeight);

    //5. Wrap it up. Return the highest amount (=lowest maxAmounts array value) that can safely fit in this bag
    return Math.min(...maxAmounts);
  }

  //Method to swap two items from 2 (or the same) inventory. Needs inventories and slot item indexes.
  swapItems(container: GameContainer, inventoryA:Inventory, itemSlotIdxA:number, inventoryB:Inventory, itemSlotIdxB:number, splitRetains: boolean = true){
    let itemSlotA = inventoryA.inventoryItems[itemSlotIdxA];
    let itemSlotB = inventoryB.inventoryItems[itemSlotIdxB];
    if(
      !inventoryB.getIsAllowedToTakeInItem(itemSlotA) ||
      !inventoryA.getIsAllowedToTakeInItem(itemSlotB)
    ) return; // Cannot swap TODO: Also a guard method for inventory provider.
    if(inventoryA === inventoryB){ //The same bag wil always be able to fit the same items, even though they are rearranged.
      let bufferItem = inventoryA.inventoryItems[itemSlotIdxA];
      inventoryA.inventoryItems[itemSlotIdxA] = inventoryB.inventoryItems[itemSlotIdxB]
      inventoryB.inventoryItems[itemSlotIdxB] = bufferItem;
      return;
    }
    if(
      inventoryA.getAmountOfItemsThatFitInInventory(itemSlotB) >= itemSlotB.item.amount ||
      inventoryB.getAmountOfItemsThatFitInInventory(itemSlotA) >= itemSlotA.item.amount
    ) {
      console.log('swapItems# swapping items');
      inventoryB.inventoryItems[itemSlotIdxB] = inventoryA.insertItemStack(itemSlotB);
      inventoryA.inventoryItems[itemSlotIdxA] = inventoryB.insertItemStack(itemSlotA);
      return;
    }

  }

  itemsAreTheSameType(itemA:Item, itemB:Item){
    return (itemA instanceof itemB.constructor && itemA instanceof itemB.constructor);
  }

}
