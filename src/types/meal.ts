export interface IMealItem {
    id: string; // ID записи в дневнике
    productId: string; // Ссылка на продукт из справочника
    weight: number; // Вес порции
}

export interface IDailyMeals {
    date: string;
    items: IMealItem[];
}