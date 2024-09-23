
const FormatCurrent = (value,currency:string)=>{
    return  value.toLocaleString("pt-BR", {style:"currency", currency});
}
export default FormatCurrent