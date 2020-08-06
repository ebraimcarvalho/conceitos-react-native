import React, {useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import api from './services/api';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data)
    })
  }, [])

  async function handleLikeRepository(id) {
    const res = await api.post(`repositories/${id}/like`);
    const repoLiked = res.data;

    const repositoriesUpdated = repositories.map(repo => {
      return (repo.id === id) ? repoLiked : repo;
    })

    setRepositories(repositoriesUpdated)
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView>
        <FlatList 
          data={repositories}
          keyExtractor={repo => repo.id}
          renderItem={({item : repo }) => (
            <View>
              <Text>{repo.title}</Text>
              <View>
                {repo.techs.map(tech => (
                  <Text key={tech}>{tech}</Text>
                ))}
              </View>

              <View>
                <Text testID={`repository-likes-${repo.id}`}>{repo.likes} curtidas</Text>
              </View>

              <TouchableOpacity
              onPress={() => handleLikeRepository(repo.id)}
              testID={`like-button-${repo.id}`}
              >
                <Text>Curtir</Text>
              </TouchableOpacity>
            </View>            
          )}
        />

      </SafeAreaView>
    </>
  )
}