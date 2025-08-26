const GetStickyCellStyle = (
    width: number,
    zIndex: number,
    left: number,
    align: string,
) => {
    return {
        position: "sticky",
        left: left,
        background: "white",
        width: width,
        zIndex: zIndex,
        align: align,
    };
};

export default GetStickyCellStyle;
