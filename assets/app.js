onload = () => {
    document.querySelector('#bt0').onclick = () => digito(0)
    document.querySelector('#bt1').onclick = () => digito(1)
    document.querySelector('#bt2').onclick = () => digito(2)
    document.querySelector('#bt3').onclick = () => digito(3)
    document.querySelector('#bt4').onclick = () => digito(4)
    document.querySelector('#bt5').onclick = () => digito(5)
    document.querySelector('#bt6').onclick = () => digito(6)
    document.querySelector('#bt7').onclick = () => digito(7)
    document.querySelector('#bt8').onclick = () => digito(8)
    document.querySelector('#bt9').onclick = () => digito(9)
    document.querySelector('#btvir').onclick = () => virgula()
    document.querySelector('#btc').onclick = () => limpa()
    document.querySelector('#btmais').onclick = () => operador('+')
    document.querySelector('#btmenos').onclick = () => operador('-')
    document.querySelector('#btdiv').onclick = () => operador('/')
    document.querySelector('#btmulti').onclick = () => operador('*')
    document.querySelector('#btigual').onclick = () => calcula()
}

let sValor = '0'
let eNovoNumero = true
let valorAnterior = 0
let operacaoPendente = null

const atualizaVisor = () => {
    let [parteInteira, parteDecimal] = sValor.split(',')
    let v = ''
    c = 0
    for (let i = parteInteira.length - 1; i >= 0; i--) {
        if (++c > 3) {
            v = '.' + v
            c = 1
        }
        v = parteInteira[i] + v
    }
    v = v + (parteDecimal ? ',' + parteDecimal : '')
    document.querySelector('#visor').innerText = v;
}

const digito = (n) => {
    if (eNovoNumero) {
        sValor = '' + n;
        eNovoNumero = false
    } else sValor += n
    atualizaVisor()
}

const virgula = () => {
    if (eNovoNumero) {
        sValor = '0,'
        eNovoNumero = false
    } else if (sValor.indexOf(',') == -1)
        sValor += ','
    atualizaVisor()
}

const limpa = () => {
    eNovoNumero = true
    sValor = '0'
    valorAnterior = 0
    operacaoPendente = null
    atualizaVisor()
}
const valorAtual = () => parseFloat(sValor.replace(',', '.'))

const operador = (op) => {
    calcula()
    valorAnterior = valorAtual()
    operacaoPendente = op
    eNovoNumero = true
}

const calcula = () => {
    if (operacaoPendente != null) {
        let resultado
        switch (operacaoPendente) {
            case '+': resultado = valorAnterior + valorAtual(); break;
            case '-': resultado = valorAnterior - valorAtual(); break;
            case '/': resultado = valorAnterior / valorAtual(); break;
            case '*': resultado = valorAnterior * valorAtual(); break;
        }
        sValor = resultado.toString().replace('.', ',')
    }
    eNovoNumero = true
    operacaoPendente = null
    valorAnterior = 0
    atualizaVisor()
}