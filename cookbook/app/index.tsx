import { useState } from "react";
import { Button, Text, View } from "react-native";

export default function Index() {
  const [count, setCount] = useState(0);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Text onPress={() => setCount(count + 1)}>Count: ${count}</Text>
    </View>
  );
}
