import { Text, View, Image, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const statusBarHeight = Constants.statusBarHeight;

type Total = {
  amount: number;
  total: number;
};

export default function Cart() {
  const [totals, setTotals] = useState<{ [key: string]: Total }>({});
  const [products, setProducts] = useState<any[]>([]);  // Inicializa como array vazio
  const frete = 1.50;

  useEffect(() => {
    // Recupera os dados do produto armazenado no AsyncStorage
    const getProductData = async () => {
      try {
        const storedProduct = await AsyncStorage.getItem("selectedProduct");
        if (storedProduct) {
          const parsedProducts = JSON.parse(storedProduct);

          // Garante que o produto seja sempre um array, mesmo que o AsyncStorage retorne algo inválido
          if (Array.isArray(parsedProducts)) {
            setProducts(parsedProducts);
            calcularTotais(parsedProducts); // Inicializa os totais para cada produto
          } else {
            setProducts([]); // Caso não seja array, inicializa como vazio
          }
        } else {
          setProducts([]); // Se não houver dados no AsyncStorage
        }
      } catch (error) {
        console.log("Erro ao buscar dados do AsyncStorage", error);
        setProducts([]); // Em caso de erro, inicializa como array vazio
      }
    };
    getProductData();
  }, []);

  const goBuy=()=>{
    router.push('(tabs)')
  }

  // Função para salvar um produto no AsyncStorage
  const adicionarProdutoAoCarrinho = async (novoProduto: any) => {
    try {
      const storedProduct = await AsyncStorage.getItem("selectedProduct");
      let produtosExistentes = storedProduct ? JSON.parse(storedProduct) : [];

      // Verifica se o AsyncStorage já contém produtos, caso sim, adiciona o novo produto
      if (Array.isArray(produtosExistentes)) {
        produtosExistentes.push(novoProduto);  // Adiciona o novo produto ao array existente
      } else {
        produtosExistentes = [novoProduto]; // Se não for array, inicializa com o novo produto
      }

      // Salva o novo array atualizado no AsyncStorage
      await AsyncStorage.setItem("selectedProduct", JSON.stringify(produtosExistentes));
      setProducts(produtosExistentes);  // Atualiza o estado dos produtos
      calcularTotais(produtosExistentes); // Atualiza os totais
    } catch (error) {
      console.log("Erro ao adicionar produto ao AsyncStorage", error);
    }
  };

  // Função para inicializar os totais
  const calcularTotais = (products: any[]) => {
    const initialTotals = {};
    products.forEach((product) => {
      initialTotals[product.id] = {
        amount: 1, // Quantidade inicial de cada produto
        total: product.preco + frete, // Preço inicial com frete
      };
    });
    setTotals(initialTotals);
  };

  // Função para adicionar quantidade a um produto
  const somarQuantidade = (productId: string) => {
    setTotals((prevTotals) => {
      const updatedTotals = { ...prevTotals };
      updatedTotals[productId].amount += 1;
      updatedTotals[productId].total =
        updatedTotals[productId].amount * products.find((p) => p.id === productId).preco + frete;
      return updatedTotals;
    });
  };

  // Função para subtrair quantidade de um produto
  const subtrairQuantidade = (productId: string) => {
    setTotals((prevTotals) => {
      const updatedTotals = { ...prevTotals };
      if (updatedTotals[productId].amount > 1) {
        updatedTotals[productId].amount -= 1;
        updatedTotals[productId].total =
          updatedTotals[productId].amount * products.find((p) => p.id === productId).preco + frete;
      }
      return updatedTotals;
    });
  };

  // Função para calcular o total geral do carrinho
  const calcularTotalGeral = () => {
    return Object.values(totals).reduce((acc, curr) => acc + curr.total, 0).toFixed(2);
  };

  return (
    <SafeAreaView
      className="flex-1 w-full items-center justify-center"
      style={{ marginTop: statusBarHeight - 30 }}
    >
      <Text className="text-stone-950 text-4xl font-bold p-2 m-2">Pedidos</Text>

      {products.length === 0 ? (
       <View className="flex justify-center items-center m-4 p-2  mt-32 ">
       <View className="bg-slate-200 w-36 h-36 rounded-full items-center justify-center mt-4 mb-4">
         <MaterialIcons
           name="remove-shopping-cart"
           size={50}
           color={"#4e4949"}
         />
       </View>
       <Text className="text-2xl font-bold">
        Ops! Seu carrinho está vazio!
       </Text>
       <Text className="text-xl font-thin m-2 text-center">
         Adicione items ao carrinho, aproveite nossas ofertas e variedades de produtos.
       </Text>

       <View className="flex w-full items-center p-2 m-2 bg-sky-800 rounded-3xl mt-4">
         <TouchableOpacity onPress={()=>goBuy()}>
           <Text className="text-2xl font-semibold text-white p-2 ">
             {" "}
             Vai Comprar
           </Text>
         </TouchableOpacity>
       </View>
     </View>
       
      ) : (
        products.map((item) => (
          <View key={item._id} className="flex w-full mb-8 m-2 justify-between">
            <View className="flex-row w-full mb-2 p-1 items-center">
              <Image
                source={{ uri: `http://10.0.0.248:5001/files/${item.image}` }}
                resizeMode="contain"
                className="w-36 h-36 rounded-2xl m-2"
              />

              <View className="flex-col items-start justify-between">
                <Text className="text-stone-950 text-2xl font-bold">{item.name}</Text>
                <View className="flex-row mt-4 items-center justify-between">
                  <Text className="text-stone-950 text-3xl font-bold">${item.preco.toFixed(2)}</Text>

                  <View className="flex-row m-1 items-center">
                    <TouchableOpacity onPress={() => subtrairQuantidade(item.id)}>
                      <View className="bg-blue-500 rounded-xl w-10 items-center ml-12">
                        <Text className="text-white text-4xl font-bold">-</Text>
                      </View>
                    </TouchableOpacity>

                    <Text className="text-stone-950 text-3xl font-bold p-2">
                      {totals[item.id]?.amount || 1}
                    </Text>

                    <TouchableOpacity onPress={() => somarQuantidade(item.id)}>
                      <View className="bg-blue-500 rounded-xl w-10 items-center">
                        <Text className="text-white text-4xl font-bold">+</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            <View className="w-full h-full flex flex-col gap-2 mt-4 mb-2 px-4">
              <Text className="text-stone-950 text-3xl font-bold">Preço Total</Text>

              <View className="justify-between items-center m-2 flex-row">
                <Text className="text-stone-600 text-2xl font-semibold">Total do Produto</Text>
                <Text className="text-stone-950 text-3xl font-bold">
                  ${totals[item.id]?.total.toFixed(2) || (item.preco + frete).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        ))
      )}

      {products.length > 0 && (
        <View className="flex items-center justify-center mt-2 m-4 p-4 bg-blue-500 rounded-xl">
          <TouchableOpacity>
            <Text className="text-2xl font-semibold text-white">
              Fazer Pedido - Total: ${calcularTotalGeral()}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
