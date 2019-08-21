
import { Icon } from 'react-native-elements';
import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';

export default mainScreenNavOptions = {
  headerStyle: {
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  headerLeft: <TouchableOpacity>
                <Icon name='account-circle'
                      size={40}
                      containerStyle={{ paddingLeft: 8 }} />
              </TouchableOpacity>,
  headerRight: <TouchableOpacity>
                 <Icon name='add'
                       size={40}
                       containerStyle={{ paddingRight: 8 }} />
               </TouchableOpacity>,
};