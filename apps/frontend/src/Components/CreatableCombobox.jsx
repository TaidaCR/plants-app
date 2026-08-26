
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Field, ComboboxButton } from '@headlessui/react'
import { useState } from 'react';
import { normalizeString } from '../utils/calculationTools';

export default function CreatableCombobox({ setValue, value, options, justList = false, fieldClass, inputClass }) {
    const [query, setQuery] = useState('')
    const filteredOptions =
        query === ''
            ? options
            : options.filter((item) => normalizeString(item).includes(normalizeString(query)))
    return (
        <Field className={`pb-[10px] bg-white p-3 rounded-xl flex justify-between font-normal text-detail relative ${fieldClass}`}>
            <label className="flex">Localización</label>
            <div className="relative">
                <Combobox onChange={setValue} value={value} onClose={() => setQuery('')}>
                    <div className="relative w-full">
                        <ComboboxInput
                            displayValue={(loc) => loc}
                            placeholder="Escribe o selecciona..."
                            onChange={(event) => {
                                const val = event.target.value;
                                setQuery(val);
                                setValue(val);
                            }}
                            className={`w-full pr-6 ${inputClass}`}
                        />
                        <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-1 text-gray-400 w-full">
                        </ComboboxButton>
                    </div>

                    <ComboboxOptions className="absolute bg-white shadow-md rounded-md w-full z-10 overflow-scroll max-h-60">
                        {!justList && query.length > 0 && !filteredOptions.includes(query) && (
                            <ComboboxOption
                                value={query}
                                className="cursor-pointer select-none py-2 px-3 text-green-700 font-medium data-[focus]:bg-green-50"
                            >
                                Crear "{query}"
                            </ComboboxOption>
                        )}

                        {filteredOptions.map((item) => (
                            <ComboboxOption
                                key={item}
                                value={item}
                                className="cursor-pointer select-none py-2 px-3 data-[focus]:bg-green-100 data-[focus]:text-green-900 capitalize"
                            >
                                {item}
                            </ComboboxOption>
                        ))}
                    </ComboboxOptions>
                </Combobox>
            </div>
        </Field>
    )
}