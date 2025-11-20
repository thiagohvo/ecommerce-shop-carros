import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { useCreateCustomer } from "@/cases/customers/hooks/use-customer";
import { useCities } from "@/cases/cities/hooks/use-city";
import { useStates } from "@/cases/states/hooks/use-state";
import { supabase } from "@/lib/supabase-client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CustomerDTO } from "@/cases/customers/dtos/customer.dto";

export default function Register() {
  const navigate = useNavigate();
  const createCustomer = useCreateCustomer();
  const { data: cities = [] } = useCities();
  const { data: states = [] } = useStates();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    zipcode: "",
    stateId: "",
    cityId: "",
  });

  const filteredCities = formData.stateId ? cities.filter((c) => c.state.id === formData.stateId) : [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectCity = (value: string) => {
    setFormData((prev) => ({ ...prev, cityId: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCity = cities.find((c) => c.id === formData.cityId);
    if (!selectedCity) {
      toast.error("Selecione uma cidade válida!");
      return;
    }

    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (signUpError) throw signUpError;

      createCustomer.mutate(
        {
          name: formData.name,
          address: formData.address,
          zipcode: formData.zipcode,
          city: selectedCity,
          userId: signUpData.user?.id,
        } as CustomerDTO,
        {
          onSuccess: () => {
            toast.success("Cadastro realizado com sucesso!");
            navigate("/login");
          },
        }
      );
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Erro ao cadastrar");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center text-lg">Cadastro</CardTitle>
          <CardDescription className="text-center">
            Preencha o formulário abaixo para criar sua conta
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name"
                           name="name"
                           value={formData.name}
                           onChange={handleChange}
                           required/>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email"
                           name="email"
                           value={formData.email}
                           onChange={handleChange}
                           required/>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input id="password"
                           name="password"
                           type="password"
                           value={formData.password}
                           onChange={handleChange}
                           required/>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required/>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="zipcode">CEP</Label>
                    <Input id="zipcode"
                           name="zipcode"
                           value={formData.zipcode}
                           onChange={handleChange}
                           required/>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="stateId">Estado</Label>
                    <Select value={formData.stateId?.toString() || ""}
                            onValueChange={(value) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    stateId: value,
                                    cityId: "",
                                }))
                            }
                        required>
                        <SelectTrigger className="w-full border rounded p-2">
                            <SelectValue placeholder="Selecione um estado..." />
                        </SelectTrigger>

                        <SelectContent>
                            {
                                states.length > 0 ? 
                                (
                                    states.map((state) => (
                                        <SelectItem key={state.id} value={String(state.id)}>
                                            {state.name} ({state.acronym})
                                        </SelectItem>
                                    ))
                                ) : 
                                (
                                    <SelectItem value="no-data" disabled>
                                        Nenhum estado encontrado
                                    </SelectItem>
                                )
                            }
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="cityId">Cidade</Label>
                    <Select value={formData.cityId?.toString() || ""}
                            onValueChange={handleSelectCity}
                            disabled={!formData.stateId}>
                        <SelectTrigger className="w-full border rounded p-2">
                            <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>

                        <SelectContent>
                            {
                                filteredCities.length > 0 ? 
                                (
                                    filteredCities.map((city) => (
                                        <SelectItem key={city.id} value={String(city.id)}>
                                            {city.name}
                                        </SelectItem>
                                    ))
                                ) : 
                                (
                                    <SelectItem value="no-data" disabled>
                                        Nenhuma cidade disponível
                                    </SelectItem>
                                )
                            }
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <CardFooter className="flex-col gap-2 mt-10">
                <Button type="submit" 
                        disabled={createCustomer.isPending} 
                        className="w-full cursor-pointer">
                    {createCustomer.isPending ? "Cadastrando..." : "Cadastrar"}
                </Button>

                <a href='/login'
                   className='self-center mt-3 text-sm text-primary hover:underline'>
                    Já possui conta? Faça login
                </a>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}