import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';

// Định nghĩa kiểu cho các props của Button
interface ButtonProps {
    w?: number;
    h?: number | null;
    text: string;
    backgroundColor?: string;
    textColor?: string;
    onPress: (text: string) => void;
}

// Định nghĩa component Button
const Button: React.FC<ButtonProps> = ({
    w = 0,
    h = null,
    text = '',
    backgroundColor = '#333333',
    textColor = 'white',
    onPress = () => {},
}) => {
    const height = h ?? w;
    const width = w;

    return (
        <View style={[styles.buttonContainer, { width: width, height: height }]}>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: backgroundColor }]}
                onPress={() => onPress(text)}
            >
                <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
};

// Định nghĩa kiểu cho các state
interface AppState {
    firstValue: string;
    operator: string;
    secondValue: string;
    clearLabel: string;
}

const App: React.FC = () => {
    const { width } = useWindowDimensions();
    const buttonContainerWidth = (width / 4) - 5;
    const [firstValue, setFirstValue] = useState<string>('');
    const [operator, setOperator] = useState<string>('');
    const [secondValue, setSecondValue] = useState<string>('');
    const [clearLabel, setClearLabel] = useState<string>('AC');

    const onKeyPress = (key: string) => {
        switch (key) {
            case 'AC':
                setFirstValue('');
                setOperator('');
                setSecondValue('');
                break;
            case 'C':
                if (secondValue !== '') {
                    setSecondValue('');
                } else {
                    setFirstValue('');
                }
                setClearLabel('AC');
                break;
            case '+/-':
                if (firstValue !== '' || secondValue !== '') {
                    newFunction();
                }
                break;
            case '%':
                calculate(firstValue, key, secondValue);
                break;
            case '/':
            case 'x':
            case '-':
            case '+':
                if (secondValue !== '') {
                    calculate(firstValue, operator, secondValue);
                } else {
                    setOperator(key);
                }
                break;
            case '=':
                calculate(firstValue, operator, secondValue);
                break;
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
            case ',':
                setClearLabel('C');
                if (operator === '') {
                    setFirstValue(prev => `${prev}${key}`);
                } else {
                    setSecondValue(prev => `${prev}${key}`);
                }
                break;
        }

      function newFunction() {
        const negateValue = (value: string) => {
          return (parseFloat(value) * -1).toString();
      };
      
      if (firstValue !== '' && secondValue === '') {
          setFirstValue(negateValue(firstValue));
      } else if (secondValue !== '') {
          setSecondValue(negateValue(secondValue));
      }
      
      }
    };

    const getDisplayText = () => {
        if (secondValue !== '') return secondValue;
        if (firstValue === '') return '0';
        return firstValue;
    };

    const formatNumber = (value: number): string => {
      // Chuyển số thành chuỗi, thay dấu '.' bằng ','
      return value.toLocaleString('de-DE'); // Ví dụ, định dạng theo tiêu chuẩn Đức
  };
    const calculate = (a: string = '', o: string = '', b: string = '') => {
        let result = 0;

        a = a.replace(',', '.');
        b = b.replace(',', '.');

        switch (o) {
            case '%':
                result = parseFloat(a) / 100;
                break;
            case '/':
                result = parseFloat(a) / parseFloat(b);
                break;
            case 'x':
                result = parseFloat(a) * parseFloat(b);
                break;
            case '-':
                result = parseFloat(a) - parseFloat(b);
                break;
            case '+':
                result = parseFloat(a) + parseFloat(b);
                break;
        }

        if (result % 1 !== 0) {
            const digitsValue = result.toString().split('.')[1];
            if (digitsValue.length > 6) {
                result = parseFloat(result.toFixed(6));
            }
        }

        const formattedResult = formatNumber(result); // Định dạng số trước khi hiển thị

    setFirstValue(formattedResult);
        setOperator('');
        setSecondValue('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.displayContainer}>
                <Text style={styles.displayText}>{getDisplayText()}</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonsRow}>
                    <Button
                        w={buttonContainerWidth}
                        text={clearLabel}
                        backgroundColor={'#A5A5A5'}
                        textColor={'#000'}
                        onPress={(key) => onKeyPress(key)}
                    />
                    <Button
                        w={buttonContainerWidth}
                        text={'+/-'}
                        backgroundColor={'#A5A5A5'}
                        textColor={'#000'}
                        onPress={(key) => onKeyPress(key)}
                    />
                    <Button
                        w={buttonContainerWidth}
                        text={'%'}
                        backgroundColor={'#A5A5A5'}
                        textColor={'#000'}
                        onPress={(key) => onKeyPress(key)}
                    />
                    <Button
                        w={buttonContainerWidth}
                        text={'/'}
                        backgroundColor={'#FF9F0A'}
                        onPress={(key) => onKeyPress(key)}
                    />
                </View>
                <View style={styles.buttonsRow}>
                    <Button
                        w={buttonContainerWidth}
                        text={'7'}
                        onPress={(key) => onKeyPress(key)}
                    />
                    <Button
                        w={buttonContainerWidth}
                        text={'8'}
                        onPress={(key) => onKeyPress(key)}
                    />
                    <Button
                        w={buttonContainerWidth}
                        text={'9'}
                        onPress={(key) => onKeyPress(key)}
                    />
                    <Button
                        w={buttonContainerWidth}
                        text={'x'}
                        backgroundColor={'#FF9F0A'}
                        onPress={(key) => onKeyPress(key)}
                    />
                </View>
                <View style={styles.buttonsRow}>
                    <Button
                        w={buttonContainerWidth}
                        text={'4'}
                        onPress={(key) => onKeyPress(key)}
                    />
                    <Button
                        w={buttonContainerWidth}
                        text={'5'}
                        onPress={(key) => onKeyPress(key)}
                    />
                    <Button
                        w={buttonContainerWidth}
                        text={'6'}
                        onPress={(key) => onKeyPress(key)}
                    />
                    <Button
                        w={buttonContainerWidth}
                        text={'-'}
                        backgroundColor={'#FF9F0A'}
                        onPress={(key) => onKeyPress(key)}
                    />
                </View>
                <View style={styles.buttonsRow}>
                    <Button
                        w={buttonContainerWidth}
                        text={'1'}
                        onPress={(key) => onKeyPress(key)}
                        
                    />
                    <Button
                        w={buttonContainerWidth}
                        text={'2'}
                        onPress={(key) => onKeyPress(key)}
                    />
                    <Button
                        w={buttonContainerWidth}
                        text={'3'}
                        onPress={(key) => onKeyPress(key)}
                    />
                    <Button
                        w={buttonContainerWidth}
                        text={'+'}
                        backgroundColor={'#FF9F0A'}
                        onPress={(key) => onKeyPress(key)}
                    />
                </View>
                <View style={styles.buttonsRow}>
                    <Button
                        w={(width / 2) - 10}
                        h={buttonContainerWidth}
                        text={'0'}
                        onPress={(key) => onKeyPress(key)}
                    />
                    <Button
                        w={buttonContainerWidth}
                        text={','}
                        onPress={(key) => onKeyPress(key)}
                    />
                    <Button
                        w={buttonContainerWidth}
                        text={'='}
                        backgroundColor={'#FF9F0A'}
                        onPress={(key) => onKeyPress(key)}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
    },
    displayContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingHorizontal: 30,
    },
    displayText: {
        fontSize: 70,
        color: 'white',
    },
    buttonsContainer: {
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 30,
    },
    buttonsRow: {
        flexDirection: 'row',
    },
    buttonContainer: {
        padding: 10,
    },
    button: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 25,
    },
});

export default App;
