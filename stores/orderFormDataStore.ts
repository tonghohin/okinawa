import { General } from "@/schemas/General";
import { Menu } from "@/schemas/Menu";
import { Order } from "@/schemas/Order";
import { Tools } from "@/tools/Tools";
import { create } from "zustand";

interface OrderFormDataState {
    formData: Order.Frontend.Form.Type;
    updateFormData: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    updateRiceOrder: (riceOrder: Order.RiceItem.Frontend.Type) => void;
    updateNoodlesOrder: (noodlesOrder: Order.NoodlesItem.Frontend.Type) => void;
    updateSnacksOrder: (snacksOrder: Order.SnacksItem.Frontend.Type) => void;
    updateOrderItemQuantity: (increment: boolean, index: number, category: Menu.Categories.Type) => void;
    updateTotal: () => void;
    updateDelivery: (isDelivery: boolean) => void;
    updateWholeAddress: (address: General.Address.Type) => void;
    updateAddress: (event: React.ChangeEvent<HTMLInputElement>) => void;
    updateAddressRegion: (regionName: General.Regions.Type) => void;
    resetFormData: () => void;
}

const useOrderFormDataStore = create<OrderFormDataState>()((set, get) => ({
    formData: Order.Frontend.Form.State,
    updateFormData: (event) =>
        set((state) => {
            return {
                formData: { ...state.formData, [event.target.name]: event.target.value }
            };
        }),
    updateRiceOrder: (riceOrder: Order.RiceItem.Frontend.Type) => {
        set((state) => {
            const isSameOrderExists = Tools.Frontend.checkOrderExists(state.formData, riceOrder, "rice");
            return {
                formData: {
                    ...state.formData,
                    items: {
                        ...state.formData.items,
                        rice: isSameOrderExists === false ? [...state.formData.items.rice, riceOrder] : state.formData.items.rice.map((riceOrderItem, index) => (index === isSameOrderExists ? { ...riceOrderItem, quantity: riceOrderItem.quantity + riceOrder.quantity } : riceOrderItem))
                    }
                }
            };
        });
        get().updateTotal();
    },
    updateNoodlesOrder: (noodlesOrder: Order.NoodlesItem.Frontend.Type) => {
        set((state) => {
            const isSameOrderExists = Tools.Frontend.checkOrderExists(state.formData, noodlesOrder, "noodles");
            return {
                formData: {
                    ...state.formData,
                    items: {
                        ...state.formData.items,
                        noodles: isSameOrderExists === false ? [...state.formData.items.noodles, noodlesOrder] : state.formData.items.noodles.map((noodlesOrderItem, index) => (index === isSameOrderExists ? { ...noodlesOrderItem, quantity: noodlesOrderItem.quantity + noodlesOrder.quantity } : noodlesOrderItem))
                    }
                }
            };
        });
        get().updateTotal();
    },
    updateSnacksOrder: (snacksOrder: Order.SnacksItem.Frontend.Type) => {
        set((state) => {
            const isSameOrderExists = Tools.Frontend.checkOrderExists(state.formData, snacksOrder, "snacks");
            return {
                formData: {
                    ...state.formData,
                    items: {
                        ...state.formData.items,
                        snacks: isSameOrderExists === false ? [...state.formData.items.snacks, snacksOrder] : state.formData.items.snacks.map((snacksOrderItem, index) => (index === isSameOrderExists ? { ...snacksOrderItem, quantity: snacksOrderItem.quantity + snacksOrder.quantity } : snacksOrderItem))
                    }
                }
            };
        });
        get().updateTotal();
    },
    updateOrderItemQuantity: (increment: boolean, index: number, category: Menu.Categories.Type) => {
        set((state) => {
            if (increment) {
                return {
                    formData: {
                        ...state.formData,
                        items: {
                            ...state.formData.items,
                            [category]: state.formData.items[category].map((orderItem, i) => {
                                if (i === index) {
                                    return {
                                        ...orderItem,
                                        quantity: orderItem.quantity + 1
                                    };
                                } else {
                                    return orderItem;
                                }
                            })
                        }
                    }
                };
            } else {
                if (state.formData.items[category][index].quantity === 1) {
                    return {
                        formData: {
                            ...state.formData,
                            items: {
                                ...state.formData.items,
                                [category]: state.formData.items[category].filter((orderItem, i) => i !== index)
                            }
                        }
                    };
                } else {
                    return {
                        formData: {
                            ...state.formData,
                            items: {
                                ...state.formData.items,
                                [category]: state.formData.items[category].map((orderItem, i) => {
                                    if (i === index) {
                                        return {
                                            ...orderItem,
                                            quantity: orderItem.quantity - 1
                                        };
                                    } else {
                                        return orderItem;
                                    }
                                })
                            }
                        }
                    };
                }
            }
        });
        get().updateTotal();
    },
    updateTotal: () =>
        set((state) => {
            return {
                formData: {
                    ...state.formData,
                    total: Tools.Frontend.getTotal(state.formData.items)
                }
            };
        }),
    updateWholeAddress: (address) =>
        set((state) => {
            return {
                formData: { ...state.formData, address: address }
            };
        }),
    updateAddress: (event) =>
        set((state) => {
            return {
                formData: state.formData.address
                    ? {
                          ...state.formData,
                          address: {
                              ...state.formData.address,
                              [event.target.name]: event.target.value
                          }
                      }
                    : state.formData
            };
        }),
    updateAddressRegion: (regionName) =>
        set((state) => {
            return {
                formData: state.formData.address ? { ...state.formData, address: { ...state.formData.address, region: regionName } } : state.formData
            };
        }),
    updateDelivery: (isDelivery) =>
        set((state) => {
            return {
                formData: {
                    ...state.formData,
                    delivery: isDelivery,
                    address: isDelivery ? General.Address.State : null
                }
            };
        }),
    resetFormData: () =>
        set(() => {
            return {
                formData: Order.Frontend.Form.State
            };
        })
}));

export default useOrderFormDataStore;
