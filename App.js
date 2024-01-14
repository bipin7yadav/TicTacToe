
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'


import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


const Icons = ({name}) => {

  switch (name) {
    case 'circle':
        return <Icon name="circle-thin" size={38} color="#F7CD2E" />
        break;
    case 'cross':
        return <Icon name="times" size={38} color="#bf0625" />
        break;
  
    default:
      return <Icon name="pencil" size={38} color="#106bcc" />

  }
}

function App() {
  const [isCross, setIsCross] = useState(false)
  const [gameWinner, setGameWinner] = useState('')
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9))

  const reloadGame = () => {
    setIsCross(false)
    setGameWinner('')
    setGameState(new Array(9).fill('empty', 0, 9))
  }

  const checkIsWinner = () => {
    //  checking  winner of the game
    if (
      gameState[0] === gameState[1] &&
      gameState[0] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setGameWinner(`${gameState[3]} won the game! 🥳`);
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setGameWinner(`${gameState[6]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setGameWinner(`${gameState[1]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setGameWinner(`${gameState[0]} won the game! 🥳`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setGameWinner(`${gameState[2]} won the game! 🥳`);
    } else if (!gameState.includes('empty', 0)) {
      setGameWinner('Draw game... ⌛️');
    }
  }
  const onChangeItem = (itemNumber) => {
    if (gameWinner) {
      // return Snackbar.show({
      //   text: gameWinner,
      //   backgroundColor: '#000000',
      //   textColor: "#FFFFFF",
      //   duration: Snackbar.LENGTH_SHORT
      // })
    }

    if (gameState[itemNumber] === 'empty') {
      gameState[itemNumber] = isCross ? 'cross': 'circle'
      setIsCross(!isCross)
    } else {
      // return Snackbar.show({
      //   text: "Position is already filled",
      //   backgroundColor: "red",
      //   textColor: "#FFF",
      //   duration: Snackbar.LENGTH_SHORT
      // })
    }

    checkIsWinner()
  }

  return (
    <SafeAreaView style={{height:"100%"}} >
      <StatusBar />
      {gameWinner ? (
        <View style={[styles.playerInfo, styles.winnerInfo]}>
          <Text style={styles.winnerTxt}>{gameWinner}</Text>
        </View>
      ) : (
        <View
        style={[
          styles.playerInfo,
          isCross ? styles.playerX : styles.playerO
        ]}
        >
          <Text style={styles.gameTurnTxt}>
            Player {isCross? 'X' : 'O'}'s Turn
          </Text>
        </View>
      )}
      {/* Game Grid */}
      <FlatList
      numColumns={3}
      data={gameState}
      style={styles.grid}
      renderItem={({item, index}) => (
        <Pressable
        key={index}
        style={styles.card}
        onPress={() => onChangeItem(index)}
        >
          <Icons name={item} />
        </Pressable>
      )}
      />
      {/* game action */}
      <Pressable
      style={styles.gameBtn}
      onPress={reloadGame}
      >
        <Text style={styles.gameBtnText}>
          {gameWinner ? 'Start new game' : 'reLoad the game'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  playerInfo: {
    height: 56,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 4,
    paddingVertical: 8,
    marginVertical: 72,
    marginHorizontal: 24,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: "#333",
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  gameTurnTxt: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  playerX: {
    backgroundColor: "#bf0625",
  },
  playerO: {
    backgroundColor: "#F7CD2E",
  },
  grid: {
    margin: 12,
    padding:20,
    borderWidth: 2,
    shadowColor:'#a30816',
    shadowOffset: {
        width: 7,
        height: 5,
    },
    shadowOpacity: 0,
    shadowRadius: 87,
    elevation: 10,
    
  },
  card: {
    height: 140,
    width: "33.33%",

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderColor: "#333",
  },
  winnerInfo: {
    borderRadius: 8,
    backgroundColor: "#38CC77",

    shadowOpacity: 0.1,
  },
  winnerTxt: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  gameBtn: {
    alignItems: "center",

    padding: 10,
    borderRadius: 8,
    marginHorizontal: 36,
    backgroundColor: "#8D3DAF",
    marginBottom:43
  },
  gameBtnText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "500",
  },
});

export default App;