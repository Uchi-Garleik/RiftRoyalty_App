import React from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';

const matchData = [
  {
    type: 'Ranked Solo',
    lpChange: '+89 LP',
    timeAgo: '4 minutes ago',
    duration: '32m 4s',
    champion: {
      name: 'Pyke',
      icon: 'https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/Aatrox.png', // Replace with the correct URL
      summonerSpells: [
        'https://ddragon.leagueoflegends.com/cdn/14.8.1/img/spell/SummonerFlash.png',
        'https://ddragon.leagueoflegends.com/cdn/14.8.1/img/spell/SummonerDot.png'
      ],
      runes: [
        'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Domination/Electrocute/Electrocute.png',
        'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Sorcery/NimbusCloak/NimbusCloak.png'
      ]
    },
    stats: {
      kda: '25/4/15',
      kdaRatio: '10.0 KDA',
      cs: '46 CS',
      csPerMin: '2.6 CS/Min'
    },
    items: [
      'https://ddragon.leagueoflegends.com/cdn/14.8.1/img/item/3153.png',
      'https://ddragon.leagueoflegends.com/cdn/14.8.1/img/item/3074.png',
      'https://ddragon.leagueoflegends.com/cdn/14.8.1/img/item/3748.png',
      'https://ddragon.leagueoflegends.com/cdn/14.8.1/img/item/3111.png',
      'https://ddragon.leagueoflegends.com/cdn/14.8.1/img/item/3026.png',
      'https://ddragon.leagueoflegends.com/cdn/14.8.1/img/item/3364.png'
    ],
    tags: ['Pentakill', 'Controller', 'Early Gank']
  },
  // Add more matches as needed
];

const MatchCard = ({ match }) => {
  return (
    <View style={styles.matchContainer}>
      <View style={styles.matchHeader}>
        <Text style={styles.matchType}>{match.type} {match.lpChange}</Text>
        <Text style={styles.matchTime}>{match.timeAgo}</Text>
        <Text style={styles.matchDuration}>{match.duration}</Text>
      </View>
      <View style={styles.matchBody}>
        <Image source={{ uri: match.champion.icon }} style={styles.championIcon} />
        <View style={styles.matchDetails}>
          <Text style={styles.championName}>{match.champion.name}</Text>
          <View style={styles.summonerSpells}>
            {match.champion.summonerSpells.map((spell, index) => (
              <Image key={index} source={{ uri: spell }} style={styles.spellIcon} />
            ))}
          </View>
          <View style={styles.runes}>
            {match.champion.runes.map((rune, index) => (
              <Image key={index} source={{ uri: rune }} style={styles.runeIcon} />
            ))}
          </View>
          <Text style={styles.stats}>{match.stats.kda} ({match.stats.kdaRatio})</Text>
          <Text style={styles.stats}>{match.stats.cs} ({match.stats.csPerMin})</Text>
        </View>
      </View>
      <View style={styles.itemsContainer}>
        {match.items.map((item, index) => (
          <Image key={index} source={{ uri: item }} style={styles.itemIcon} />
        ))}
      </View>
      <View style={styles.tagsContainer}>
        {match.tags.map((tag, index) => (
          <Text key={index} style={[styles.tag, styles[`tag${tag}`]]}>{tag}</Text>
        ))}
      </View>
    </View>
  );
};

const MatchList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Matches</Text>
      {matchData.map((match, index) => (
        <MatchCard key={index} match={match} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C2E',
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  matchContainer: {
    backgroundColor: '#2A2A40',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  matchType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00FF00',
  },
  matchTime: {
    fontSize: 12,
    color: '#fff',
  },
  matchDuration: {
    fontSize: 12,
    color: '#fff',
  },
  matchBody: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  championIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  matchDetails: {
    flex: 1,
  },
  championName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  summonerSpells: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  spellIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  runes: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  runeIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  stats: {
    fontSize: 14,
    color: '#fff',
  },
  itemsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  itemIcon: {
    width: 32,
    height: 32,
    marginRight: 5,
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  tag: {
    fontSize: 12,
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 5,
  },
  tagPentakill: {
    backgroundColor: '#FF0000',
  },
  tagController: {
    backgroundColor: '#4B0082',
  },
  tagEarlyGank: {
    backgroundColor: '#0000FF',
  },
});

export default MatchList;
