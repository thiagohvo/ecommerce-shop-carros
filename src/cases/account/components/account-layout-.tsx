import { useCities } from "@/cases/cities/hooks/use-city";
import { useCurrentCustomer, useUpdateCustomer } from "@/cases/customers/hooks/use-customer";
import { OrderDataTable } from "@/cases/orders/components/data-table/order-data-table";
import { useStates } from "@/cases/states/hooks/use-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

export function AccountLayout() {
    const { customer, isLoading: customersLoading } = useCurrentCustomer();
    const { data: cities = [], isLoading: citiesLoading } = useCities();
    const { data: states = [], isLoading: statesLoading } = useStates();
    const { mutate: updateCustomer, isPending } = useUpdateCustomer();

    const [formData, setFormData] = useState({
        address: "",
        zipcode: "",
        stateId: "",
        cityId: "",
    });

    const [initialized, setInitialized] = useState(false);

    const getCustomerCityId = (cust: any) => {
        if (!cust) return undefined;
        const c = cust.city;
        if (!c) return undefined;
        return typeof c === "string" ? c : c?.id;
    };

    useEffect(() => {
        const ready = !customersLoading && !citiesLoading && !statesLoading && !!customer && cities.length > 0 && states.length > 0;

        if (!ready) {
            setInitialized(false);
            return;
        }

        if (initialized) return;

        const customerCityId = getCustomerCityId(customer);
        const city = cities.find((c) => String(c.id) === String(customerCityId));
        const stateIdFromCity = city?.state?.id ? String(city.state.id) : undefined;

        const stateIdFromCustomer = (typeof customer.city !== "string" && customer.city?.state?.id) ? String(customer.city.state.id) : undefined;
        const stateId = stateIdFromCity ?? stateIdFromCustomer ?? "";

        setFormData({
            address: customer.address ?? "",
            zipcode: customer.zipcode ?? "",
            stateId,
            cityId: city ? String(city.id) : String(customerCityId ?? ""),
        });

        setInitialized(true);
    }, [customersLoading, citiesLoading, statesLoading, customer, cities, states]);

    const filteredCities = formData.stateId ? cities.filter((c) => String(c.state.id) === String(formData.stateId)) : [];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!customer) return;

        const selectedCity = cities.find((c) => String(c.id) === String(formData.cityId));
        if (!selectedCity) {
            return;
        }

        updateCustomer({
            id: customer.id!,
            customer: {
                ...customer,
                address: formData.address,
                zipcode: formData.zipcode,
                city: selectedCity,
            },
        });
    };

    if (!initialized) {
        return (
        <div className="p-8">
            <p>Carregando dados do usuário...</p>
        </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold mb-8">
                    Olá <span className="font-bold text-blue-600">{customer ? customer.name : "usuário"}</span>!
                </h1>

                <div className="flex flex-col mb-8">
                    <h2 className="text-xl font-semibold mb-8">Endereço</h2>

                    <form onSubmit={handleSubmit}
                          className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        <div className="col-span-1 flex flex-col gap-2">
                            <Label htmlFor="address">Endereço</Label>
                            <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                        </div>

                        <div className="col-span-1 flex flex-col gap-2">
                            <Label htmlFor="zipcode">CEP</Label>
                            <Input id="zipcode" name="zipcode" value={formData.zipcode} onChange={handleChange} required />
                        </div>

                        <div className="col-span-1 flex flex-col gap-2 md:justify-self-center">
                            <Label htmlFor="stateId">Estado</Label>
                            <Select value={formData.stateId}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            stateId: value,
                                            cityId: "",
                                        }))
                                    }>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione um estado..." />
                                </SelectTrigger>

                                <SelectContent>
                                    {states.map((state) => (
                                        <SelectItem key={state.id} value={String(state.id)}>
                                            {state.name} ({state.acronym})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="col-span-1 flex flex-col gap-2">
                            <Label htmlFor="cityId">Cidade</Label>
                            <Select value={formData.cityId}
                                    onValueChange={(value) => setFormData((prev) => ({ ...prev, cityId: value }))}
                                    disabled={!formData.stateId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione uma cidade..." />
                                </SelectTrigger>

                                <SelectContent>
                                    {filteredCities.length > 0 ? (
                                        filteredCities.map((city) => (
                                            <SelectItem key={city.id} value={String(city.id)}>
                                                {city.name}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem value="no-data" disabled>
                                            Nenhuma cidade disponível
                                        </SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex self-end">
                            <Button className="cursor-pointer" type="submit" disabled={isPending}>
                                {isPending ? "Salvando..." : "Salvar alterações"}
                            </Button>
                        </div>
                    </form>
                </div>

                <div className="flex flex-col">
                    <h2 className="text-xl font-semibold mb-8">Pedidos</h2>
                    <OrderDataTable />
                </div>
            </div>
        </div>
    );
}