export type Obj<V = any> = { [attr: string]: V };

export type SelectOption<D extends Obj = Obj> = {
    label: string | number;
    value: string | number;
    disabled?: boolean;
    tooltipTitle?: string;
    data?: D;
};
