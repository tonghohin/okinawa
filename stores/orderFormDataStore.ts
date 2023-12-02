import { General } from "@/schemas/General";
import { Menu } from "@/schemas/Menu";
import { Order } from "@/schemas/Order";
import { Tools } from "@/tools/Tools";
import { create } from "zustand";

interface OrderFormDataState {
    formData: Order.Frontend.Form.Type;
    updateFormData: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    updateOrder: (order: Order.RiceItem.Frontend.Type | Order.NoodlesItem.Frontend.Type | Order.SnacksItem.Frontend.Type, category: Menu.Categories.Type) => void;
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
        set((state) => ({
            formData: { ...state.formData, [event.target.name]: event.target.value }
        })),
    updateOrder: (order: Order.RiceItem.Frontend.Type | Order.NoodlesItem.Frontend.Type | Order.SnacksItem.Frontend.Type, category: Menu.Categories.Type) => {
        set((state) => {
            const isSameOrderExists = Tools.Frontend.checkOrderExists(state.formData, order, category);
            return {
                formData: {
                    ...state.formData,
                    items: {
                        ...state.formData.items,
                        [category]: isSameOrderExists === false ? [...state.formData.items[category], order] : state.formData.items[category].map((orderItem, index) => (index === isSameOrderExists ? { ...orderItem, quantity: orderItem.quantity + order.quantity } : orderItem))
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
        set((state) => ({
            formData: {
                ...state.formData,
                total: Tools.Frontend.getTotal(state.formData.items)
            }
        })),
    updateWholeAddress: (address) =>
        set((state) => ({
            formData: { ...state.formData, address: address }
        })),
    updateAddress: (event) =>
        set((state) => ({
            formData: state.formData.address
                ? {
                      ...state.formData,
                      address: {
                          ...state.formData.address,
                          [event.target.name]: event.target.value
                      }
                  }
                : state.formData
        })),
    updateAddressRegion: (regionName) =>
        set((state) => ({
            formData: state.formData.address ? { ...state.formData, address: { ...state.formData.address, region: regionName } } : state.formData
        })),
    updateDelivery: (isDelivery) =>
        set((state) => ({
            formData: {
                ...state.formData,
                delivery: isDelivery,
                address: isDelivery ? General.Address.State : null
            }
        })),
    resetFormData: () =>
        set(() => ({
            formData: Order.Frontend.Form.State
        }))
}));

export default useOrderFormDataStore;
