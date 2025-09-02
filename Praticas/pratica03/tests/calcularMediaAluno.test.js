const { calcularMediaAluno } = require('../src/calcularMediaAluno');

describe('calcularMediaAluno', () => {
    test('deve existir a função calcularMediaAluno', () => {
        expect(calcularMediaAluno).toBeDefined();
    });

    test('deve lançar exceção quando a1 ou a2 estiverem indefinidos', () => {
        expect(() => calcularMediaAluno(undefined, 7)).toThrow('Notas a1 ou a2 não informadas');
        expect(() => calcularMediaAluno(6, undefined)).toThrow('Notas a1 ou a2 não informadas');
        expect(() => calcularMediaAluno(undefined, undefined)).toThrow('Notas a1 ou a2 não informadas');
    });

    test('deve lançar exceção quando a1 ou a2 forem negativos', () => {
        expect(() => calcularMediaAluno(-1, 7)).toThrow('Notas a1 ou a2 não podem ser negativas');
        expect(() => calcularMediaAluno(6, -2)).toThrow('Notas a1 ou a2 não podem ser negativas');
        expect(() => calcularMediaAluno(-3, -4)).toThrow('Notas a1 ou a2 não podem ser negativas');
    });

    test('deve calcular média base quando a3 não é informada', () => {
        expect(calcularMediaAluno(6, 7)).toBeCloseTo(6.6); // 6*0.4 + 7*0.6 = 6.6
        expect(calcularMediaAluno(8, 5)).toBeCloseTo(6.2); // 8*0.4 + 5*0.6 = 6.2
    });

    test('deve lançar exceção quando a3 for negativa', () => {
        expect(() => calcularMediaAluno(6, 7, -1)).toThrow('Nota a3 não pode ser negativa');
    });

    test('deve calcular média com a3 quando a1 com a3 é a melhor combinação', () => {
        // a1=4, a2=8, a3=7 → melhor combinação: a1(4) com a3(7) = 4*0.4 + 7*0.6 = 5.8
        expect(calcularMediaAluno(4, 8, 7)).toBeCloseTo(5.8);
    });

    test('deve calcular média com a3 quando a3 com a2 é a melhor combinação', () => {
        // a1=8, a2=4, a3=7 → melhor combinação: a3(7) com a2(4) = 7*0.4 + 4*0.6 = 5.2
        expect(calcularMediaAluno(8, 4, 7)).toBeCloseTo(5.2);
    });

    test('deve calcular média com a3 quando a1 com a2 continua sendo a melhor', () => {
        // a1=7, a2=8, a3=6 → melhor combinação: a1(7) com a2(8) = 7*0.4 + 8*0.6 = 7.6
        expect(calcularMediaAluno(7, 8, 6)).toBeCloseTo(7.6);
    });
});