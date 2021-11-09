import { ContentCopy, Delete } from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { ContentHeader, SensoresForm, SidePage, Tabela } from 'components';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useStyles } from './Sensores.styles';

export default function Sensores() {
  const styles = useStyles();
  const MySwal = withReactContent(Swal);

  const [isSidePageOpen, setIsSidePageOpen] = useState(false);

  const onCadastrarNovoClick = () => {
    console.log('onCadastrarNovoSensorClick');
    setIsSidePageOpen(true);
  };

  const onClose = () => {
    console.log('onClose');
    setIsSidePageOpen(false);
  };

  const deleteSensor = (sensor) => {
    MySwal.fire({
      title: `Confirmar exclusão?`,
      html: `Deseja realmente excluir o sensor: <strong>${sensor.name}</strong>?`,
      showDenyButton: true,
      confirmButtonText: 'Excluir',
      confirmButtonColor: '#dc3545',
      denyButtonText: `Não Excluir`,
      denyButtonColor: '#6c757d',
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        //TODO: ajax request to delete
        toast.success(`Sensor ${sensor.name} excluído com sucesso`, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 4000,
        });
      } else if (result.isDenied) {
        MySwal.close();
      }
    });
  };

  const duplicateSensor = (item) => {
    setIsSidePageOpen(true);
    console.log(item);
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Nome',
      flex: 0.2,
    },
    {
      field: 'local',
      headerName: 'Localização',
      flex: 0.2,
    },
    {
      field: 'patrimonio',
      headerName: 'Nº de patrimônio',
      flex: 0.2,
    },
    {
      field: 'lastActiv',
      headerName: 'Última ativação',
      flex: 0.2,
      type: 'dateTime',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Opções',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => deleteSensor(params.row)}
        />,
        <GridActionsCellItem
          icon={<ContentCopy />}
          label="Clone"
          onClick={() => duplicateSensor(params.row)}
        />,
      ],
    },
  ];

  const rows = [
    {
      id: 1,
      name: 'Porta Entrada Principal',
      local: 'Local 1',
      patrimonio: 123456,
      lastActiv: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 2,
      name: 'Corredor Principal',
      local: 'Local 2',
      patrimonio: 123456,
      lastActiv: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 3,
      name: 'Porta IC',
      local: 'Local 3',
      patrimonio: 123456,
      lastActiv: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 4,
      name: 'Corredor IC',
      local: 'Local 4',
      patrimonio: 123456,
      lastActiv: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 5,
      name: 'Porta Sala 1',
      local: 'Local 5',
      patrimonio: 123456,
      lastActiv: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 6,
      name: 'Porta Sala 2',
      local: 'Local 6',
      patrimonio: 123456,
      lastActiv: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 7,
      name: 'Porta Sala 3',
      local: 'Local 10',
      patrimonio: 123456,
      lastActiv: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 8,
      name: 'Porta Entrada Principal',
      local: 'Local 12',
      patrimonio: 123456,
      lastActiv: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 9,
      name: 'Corredor Principal',
      local: 'Local 13',
      patrimonio: 123456,
      lastActiv: new Date(1979, 0, 1, 0, 5),
    },
    {
      id: 10,
      name: 'Porta IC',
      local: 'Local 19',
      patrimonio: 123456,
      lastActiv: new Date(1979, 0, 1, 0, 5),
    },
  ];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageWrapper}>
        <ContentHeader
          title="Sensores"
          buttonLabel="Cadastrar Novo"
          searchLabel="Pesquisar por sensor"
          searchPlaceholder="Nome, Localização ou Patrimônio"
          onButtonClick={onCadastrarNovoClick}
        />
        <Tabela columns={columns} rows={rows} />
      </div>
      {isSidePageOpen ? (
        <SidePage onClose={onClose}>
          <SensoresForm closeSidePage={onClose} />
        </SidePage>
      ) : null}
    </div>
  );
}
