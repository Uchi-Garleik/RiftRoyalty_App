import React from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MatchList from './Matchlist';

const data = {
  ranked: [
    {
      type: 'Ranked Solo/Duo',
      tier: 'Gold II',
      lp: '54 LP',
      winRate: '62.3% Win Rate',
      record: '15W - 8L',
      icon: 'https://static.wikia.nocookie.net/leagueoflegends/images/7/78/Season_2023_-_Gold.png/', // replace with the actual URL
    },
    {
      type: 'Ranked 5v5',
      tier: 'Unranked',
      lp: '0 LP',
      winRate: '70.3% Win Rate',
      record: '7W - 2L',
      icon: 'https://static.wikia.nocookie.net/leagueoflegends/images/7/78/Season_2023_-_Gold.png/', // replace with the actual URL
    },
  ],
  champions: [
    {
      name: 'Twisted Fate',
      kda: '2.18 KDA',
      stats: '1.7 / 7.3 / 14.3',
      winRate: '67%',
      games: '27 Games',
      icon: 'https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/Aatrox.png', // replace with the actual URL
    },
    {
        name: 'Twisted Fate',
        kda: '2.18 KDA',
        stats: '1.7 / 7.3 / 14.3',
        winRate: '67%',
        games: '27 Games',
        icon: 'https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/Aatrox.png', // replace with the actual URL
      },
      {
        name: 'Twisted Fate',
        kda: '2.18 KDA',
        stats: '1.7 / 7.3 / 14.3',
        winRate: '67%',
        games: '27 Games',
        icon: 'https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/Aatrox.png', // replace with the actual URL
      }
    // Add more champions here if needed
  ],
  friends: [
    {
      name: 'Hide On Bush',
      winRate: '65.0% Win Rate',
      icon: 'https://ddragon.leagueoflegends.com/cdn/14.9.1/img/profileicon/0.png', // replace with the actual URL
    },
    {
      name: 'IMHERSUPPORTMAIN',
      winRate: '52.1% Win Rate',
      icon: 'https://ddragon.leagueoflegends.com/cdn/14.9.1/img/profileicon/0.png', // replace with the actual URL
    },
    {
      name: 'LuvFlakkedCheeks',
      winRate: '47.3% Win Rate',
      icon: 'https://ddragon.leagueoflegends.com/cdn/14.9.1/img/profileicon/0.png', // replace with the actual URL
    },
  ],
};

const ProfileStats = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        {data.ranked.map((rank, index) => (
          <View key={index} style={styles.rankContainer}>
            <Image source={{ uri: rank.icon }} style={styles.rankIcon} />
            <View>
              <Text style={styles.rankType}>{rank.type}</Text>
              <Text style={styles.rankTier}>{rank.tier}</Text>
              <Text style={styles.rankDetails}>{rank.lp}</Text>
              <Text style={styles.rankDetails}>{rank.winRate}</Text>
              <Text style={styles.rankDetails}>{rank.record}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Most Played Champions</Text>
        {data.champions.map((champion, index) => (
          <View key={index} style={styles.championContainer}>
            <Image source={{ uri: champion.icon }} style={styles.championIcon} />
            <View>
              <Text style={styles.championName}>{champion.name}</Text>
              <Text style={styles.championStats}>{champion.kda}</Text>
              <Text style={styles.championStats}>{champion.stats}</Text>
              <Text style={styles.championStats}>{champion.winRate} - {champion.games}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Most Friends Played With</Text>
        <FlatList
          data={data.friends}
          horizontal
          renderItem={({ item }) => (
            <View style={styles.friendContainer}>
              <Image source={{ uri: item.icon }} style={styles.friendIcon} />
              <Text style={styles.friendName}>{item.name}</Text>
              <Text style={styles.friendWinRate}>{item.winRate}</Text>
            </View>
          )}
          keyExtractor={(item) => item.name}
        />
      </View>
      <MatchList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C2E',
    padding: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#2A2A40',
    borderRadius: 8,
  },
  rankIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  rankType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  rankTier: {
    fontSize: 14,
    color: '#FFD700',
  },
  rankDetails: {
    fontSize: 12,
    color: '#fff',
  },
  championContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#2A2A40',
    borderRadius: 8,
  },
  championIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  championName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  championStats: {
    fontSize: 12,
    color: '#fff',
  },
  friendContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  friendIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 5,
  },
  friendName: {
    fontSize: 14,
    color: '#fff',
  },
  friendWinRate: {
    fontSize: 12,
    color: '#fff',
  },
});

export default ProfileStats;