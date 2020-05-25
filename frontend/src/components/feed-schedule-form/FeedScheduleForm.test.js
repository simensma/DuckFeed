import React from 'react';
import FeedScheduleForm from "./FeedScheduleForm"
import {render, fireEvent, wait} from '@testing-library/react'
import { act } from 'react-dom/test-utils';

describe('when rendering component', () => {

    describe('date field', () => {
        it('should exist', () => {
            const {getByLabelText} = render(<FeedScheduleForm/>);
            getByLabelText('Date');
        });

        it('should not show an error message on load', async () => {
            const {queryByText} = render(<FeedScheduleForm/>);

            await wait();
            const input = queryByText('Please enter a date');

            expect(input).toBeNull();
        });

        it('should show error message when empty', async () => {
            const {getByText, getByLabelText} = render(<FeedScheduleForm/>);
            const input = getByLabelText('Date');

            act(() => {
                fireEvent.change(input, {
                    target: {
                        value: '',
                    }
                });
            });
            
            await wait();
            
            getByText('Please enter a date');
        });
    });
})
