import React, { useState } from 'react';
import { FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

import colors from '../../constants/Colors';
import { useHistory, IHistoryItem } from '../../hooks/History';
import {
  PageContainer,
  PageTitle,
  PageMessage,
  LineDivider,
  HistoryItemContainer,
  HistoryItemContentContainer,
  HistoryItemDate,
  HistoryItemExpression,
  HistoryItemLeftContainer,
  HistoryItemResult,
  HistoryItemRightContainer,
  HistoryItemTitle,
  HistoryItemText,
  ClearButton,
  Footer,
  Backdrop,
  ModalContainer,
  CloseButtonContainer,
  ModalTextContainer,
  ModalText,
  ModalButtonsContainer,
  ModalButtonText,
  ModalNoButton,
  ModalYesButton,
} from './styles';

const History: React.FC = () => {
  const { history, clearHistory } = useHistory();

  const isFocused = useIsFocused();

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isFocused) {
    return null;
  }

  const onClearHistoryPress = () => {
    setIsModalOpen(true);
  };

  const renderModal = () => (
    <Backdrop>
      <ModalContainer>
        <CloseButtonContainer>
          <TouchableOpacity
            onPress={() => {
              setIsModalOpen(false);
            }}
          >
            <MaterialCommunityIcons size={30} name="close" color={colors.grey} />
          </TouchableOpacity>
        </CloseButtonContainer>
        <ModalTextContainer>
          <ModalText>Clear history?</ModalText>
        </ModalTextContainer>
        <ModalButtonsContainer>
          <ModalYesButton
            onPress={() => {
              clearHistory();
              setIsModalOpen(false);
            }}
          >
            <ModalButtonText>Yes</ModalButtonText>
          </ModalYesButton>
          <ModalNoButton
            onPress={() => {
              setIsModalOpen(false);
            }}
          >
            <ModalButtonText>No</ModalButtonText>
          </ModalNoButton>
        </ModalButtonsContainer>
      </ModalContainer>
    </Backdrop>
  );

  const renderHistoryItem = (historyItem: IHistoryItem) => {
    const {
      name, date, expression, result,
    } = historyItem;

    return (
      <HistoryItemContainer>
        <HistoryItemContentContainer>
          <HistoryItemLeftContainer>
            <HistoryItemTitle>{name}</HistoryItemTitle>
            <HistoryItemText>
              {'roll: '}
              <HistoryItemExpression>{expression}</HistoryItemExpression>
            </HistoryItemText>
          </HistoryItemLeftContainer>
          <HistoryItemRightContainer>
            <HistoryItemDate>{date}</HistoryItemDate>
            <HistoryItemText>
              {'result: '}
              <HistoryItemResult>{result}</HistoryItemResult>
            </HistoryItemText>
          </HistoryItemRightContainer>
        </HistoryItemContentContainer>
        <LineDivider />
      </HistoryItemContainer>
    );
  };

  return (
    <PageContainer>
      <PageTitle>History</PageTitle>
      <LineDivider />
      {history.length > 0
        ? (
          <>
            <FlatList
              bounces={false}
              style={{ width: '100%' }}
              data={history}
              renderItem={({ item }) => renderHistoryItem(item)}
              keyExtractor={(item, index) => `${item.date}-${index}`}
              ListFooterComponent={() => <Footer />}
            />
            <ClearButton onPress={onClearHistoryPress}>
              <MaterialCommunityIcons size={40} name="trash-can-outline" color={colors.white} />
            </ClearButton>
          </>
        )
        : <PageMessage>No history yet. Roll some dices!</PageMessage>}
      {isModalOpen ? renderModal() : null}
    </PageContainer>
  );
};

export default History;
