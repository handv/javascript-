function evaluate(expression) {
    const operatorFunctions = {
        '+': (a, b) => a + b,  // 加法运算
        '-': (a, b) => a - b,  // 减法运算
        '*': (a, b) => a * b,  // 乘法运算
        '/': (a, b) => a / b   // 除法运算
    };

    const precedence = {
        '+': 1,  // 加法运算符的优先级
        '-': 1,  // 减法运算符的优先级
        '*': 2,  // 乘法运算符的优先级
        '/': 2   // 除法运算符的优先级
    };

    function applyOperator(operands, operators) {
        const operator = operators.pop();  // 弹出运算符
        const operand2 = operands.pop();  // 弹出第二个操作数
        const operand1 = operands.pop();  // 弹出第一个操作数
        const result = operatorFunctions[operator](operand1, operand2);  // 应用运算符并计算结果
        operands.push(result);  // 将结果压入操作数栈
    }

    function evaluateExpression(expression) {
        const operands = [];  // 操作数栈
        const operators = [];  // 运算符栈

        for (let i = 0; i < expression.length; i++) {
            const char = expression[i];  // 当前字符

            if (char === ' ') {
                continue;  // 如果是空格，则继续下一次循环
            } else if (char === '(') {
                operators.push(char);  // 如果是左括号，则将其压入运算符栈
            } else if (char === ')') {
                while (operators.length > 0 && operators[operators.length - 1] !== '(') {
                    applyOperator(operands, operators);  // 弹出运算符栈中的运算符，并应用到操作数栈中的操作数上
                }
                operators.pop(); // 移除左括号
            } else if (char in operatorFunctions) {
                const currentPrecedence = precedence[char];  // 当前运算符的优先级
                while (operators.length > 0 && operators[operators.length - 1] !== '(' && precedence[operators[operators.length - 1]] >= currentPrecedence) {
                    applyOperator(operands, operators);  // 弹出运算符栈中的运算符，并应用到操作数栈中的操作数上
                }
                operators.push(char);  // 将当前运算符压入运算符栈
            } else if (char === '-' && (i === 0 || expression[i - 1] === '(')) {
                let operand = '-';
                i++;
                while (i < expression.length && !isNaN(expression[i])) {
                    operand += expression[i];  // 将连续的数字字符拼接成操作数
                    i++;
                }
                i--; // 减少 i 的值以补偿循环中的额外增量
                operands.push(Number(operand));  // 将操作数转换为数字并压入操作数栈
            } else {
                let operand = '';
                while (i < expression.length && !isNaN(expression[i])) {
                    operand += expression[i];  // 将连续的数字字符拼接成操作数
                    i++;
                }
                i--; // 减少 i 的值以补偿循环中的额外增量
                operands.push(Number(operand));  // 将操作数转换为数字并压入操作数栈
            }
        }

        while (operators.length > 0) {
            applyOperator(operands, operators);  // 弹出运算符栈中的运算符，并应用到操作数栈中的操作数上
        }

        return operands.pop();  // 返回最终的计算结果
    }

    return evaluateExpression(expression);  // 调用 evaluateExpression 函数进行表达式求值
}

// @test
console.log(evaluate('12*(3+4)-6+8/1')); // 86