import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { MaterialIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useCallback } from 'react';
import * as Clipboard from 'expo-clipboard';
import { useNavigation } from '@react-navigation/native';
import MyTransaction from './sendTx'

type AccountProps = {
  address: string,
  balance: number,
  // onDeleteAccount: () => void; // Prop function to handle account deletion
}


const Account = ({ address, balance }: AccountProps) => {
  const [page, setPage] = useState('account')
  const one = address.substring(0, 5)
  const two = address.substring(38, 42)

  const navigation = useNavigation();
  const handleDelete = () => {
    //to remove mnemonics and navigate back to the welcome page
    confirmDelete();
    // navigation.goBack();
    };
  // Function to confirm account deletion
  const confirmDelete = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete this account?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("Delete clicked")}
      ]
    );
  };

  const handleCopy = useCallback(() => {
    Clipboard.setString(address);
  }, [address])
  const handlePage = useCallback(() => {
    setPage('send')
  }, [setPage])

  return (
    <View style={styles.container}>
      { page === 'account' && (
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>My Account</Text>
            <TouchableOpacity onPress={handleCopy}>
              <View style={styles.addressBox}>
                <Text style={styles.address}>{one}...{two}</Text>
                <Feather name="copy" size={19} color="dimgray" />
              </View>
            </TouchableOpacity>
          </View>
          {/* ---------------- */}
          <View style={styles.subContainer}>
            <View style={styles.etherIcon}>
              <MaterialCommunityIcons name="ethereum" size={44} color="black" />
            </View>
            <Text style={styles.balanceText}>{balance === 0 ? 0 : balance} Sapolia ETH</Text>
            {/* ---------------- */}
            <View style={styles.iconContainer}>
              <View style={styles.iconBox}>
                <TouchableOpacity style={styles.icon}>
                  <MaterialIcons name="file-download" size={38} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.iconText}>Buy</Text>
              </View>
              <View style={styles.iconBox}>
                <TouchableOpacity onPress={handlePage} style={styles.icon}>
                  <Feather name="arrow-up-right" size={38} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.iconText}>Send</Text>
              </View>
              {/* <View style={styles.iconBox}>
                <TouchableOpacity style={styles.icon}>
                  <MaterialIcons name="swap-horiz" size={38} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.iconText}>Swap</Text>
              </View> */}
              <View style={styles.iconBox}>
                <TouchableOpacity style={styles.icon}
                onPress={handleDelete}>
                  <MaterialIcons name="delete" size={33} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.iconText}>Del</Text>
              </View>
            </View>
            {/* ---------------- */}
          </View>
        </View>
      )}
      { page === 'send' && <MyTransaction address={address} balance={balance} setPage={setPage} /> }
    </View>
  )
}
export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  titleContainer: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: 28,
  },
  addressBox: {
    flexDirection: 'row',
    paddingBottom: 20,
    paddingTop: 10,
  },
  address: {
    color: 'dimgray',
    fontSize: 16,
    marginRight: 3,
  },
  subContainer: {
    borderTopWidth: 1,
    borderColor: 'gray',
    paddingTop: 25,
  },
  etherIcon: {
    alignItems: 'center',
    paddingBottom: 11,
  },
  balanceText: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '500',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 35,
  },
  iconBox: {
    width: 48,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 50,
    height: 48,
  },
  iconText: {
    color: '#007AFF', // 2196F3
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 17,
    paddingTop: 7,
  },
});