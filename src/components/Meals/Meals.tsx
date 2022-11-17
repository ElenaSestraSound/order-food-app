import * as React from 'react';
import AvailableMeals from './AvailableMeals';
import MealsSummary from './MealsSummary';

export default function Meals() {
    return (
        <React.Fragment>
            <MealsSummary />
            <AvailableMeals />
        </React.Fragment>
    );
}
