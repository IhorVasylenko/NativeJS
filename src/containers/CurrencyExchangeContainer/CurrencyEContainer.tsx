import React from 'react';
import {Dispatch} from 'redux';
import CurrencyExchange from '../../components/CurrencyExchange/CurrencyExchange';
import { CurrencyType } from '../../redux/currencyReducer';
import {changeAction, changeCurrencyField, changeCurrentCurrency, CurrencyReducersTypes} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {selectAllStateValues} from "../../redux/selectors";


const CurrencyEContainer: React.FC= () => {

    const dispatch = useDispatch<Dispatch<CurrencyReducersTypes>>();

    const {
        currencies,
        currentCurrency,
        isBuying,
        amountOfBYN,
        amountOfCurrency,
    } = useSelector(selectAllStateValues);

    let currencyRate: number = 0;
    const currenciesName = currencies.map((currency: CurrencyType) => {
        if (currency.currencyName === currentCurrency) {
            currencyRate = isBuying ? currency.buyRate : currency.sellRate;
        }
        return currency.currencyName;
    });

    const changeCurrencyFieldF = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value;
        if (!isFinite(+value)) return;
        if (e.currentTarget.dataset.currency) {
            const trigger: string = e.currentTarget.dataset.currency;
            if (trigger === 'byn') {
                if (value === '') {
                    dispatch(changeCurrencyField(value, value));
                } else {
                    dispatch(changeCurrencyField(value,
                        (+Number(value).toFixed(2) / currencyRate).toFixed(2)));
                }
            } else {
                if (value === '') {
                    dispatch(changeCurrencyField(value, value));
                } else {
                    dispatch(changeCurrencyField(
                        (+Number(value).toFixed(2) * currencyRate).toFixed(2), value));
                }
            }
        }
    };
    const changeActionF = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.currentTarget.dataset.action === 'buy'
            ? dispatch(changeAction(true))
            : dispatch(changeAction(false));
    };

    const changeCurrentCurrencyF = (e: React.MouseEvent<HTMLLIElement>) => {
        e.currentTarget.dataset.currency && dispatch(changeCurrentCurrency(e.currentTarget.dataset.currency));
    };

    return (
        <CurrencyExchange
            currenciesName={currenciesName}
            currentCurrency={currentCurrency}
            currencyRate={currencyRate}
            isBuying={isBuying}
            amountOfBYN={amountOfBYN}
            amountOfCurrency={amountOfCurrency}
            changeCurrencyField={changeCurrencyFieldF}
            changeAction={changeActionF}
            changeCurrentCurrency={changeCurrentCurrencyF}
        />
    );
};

// const mapStateToProps = ( { currency } : {currency: CurrencyState} ): CurrencyState => {
//     return {
//         currencies: currency.currencies,
//         currentCurrency: currency.currentCurrency,
//         isBuying: currency.isBuying,
//         amountOfBYN: currency.amountOfBYN,
//         amountOfCurrency: currency.amountOfCurrency,
//     };
// };
// const mapDispatchToProps = (dispatch: Dispatch<CurrencyReducersTypes>) : any => {
//     return {
//         setCurrencyAmount(amountOfBYN: string, amountOfCurrency: string) {
//             dispatch(ChangeCurrencyFieldAC(amountOfBYN, amountOfCurrency));
//         },
//         setAction(isBuying: boolean) {
//             dispatch(ChangeActionAC(isBuying));
//         },
//         changeCurrency(currency: string) {
//             dispatch(ChangeCurrentCurrencyAC(currency));
//         },
//     };
// };
// const connector = connect(mapStateToProps, mapDispatchToProps);
// const connector = connect(mapStateToProps, {});
//
// type TProps = ConnectedProps<typeof connector>;

export default CurrencyEContainer;

