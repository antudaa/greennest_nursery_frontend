export type TGetCategory = {
    key?: string,
    _id: string;
    categoryName: string;
    categoryImage: string;
    isDeleted: boolean;
}

export type TCategory = {
    _id?: string;
    categoryName: string;
    categoryImage?: string;
};

export type TCategoryEdit = {
    _id?: string;
    categoryName?: string;
    categoryImage?: string;
}