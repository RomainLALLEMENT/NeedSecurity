-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 10 jan. 2022 à 15:09
-- Version du serveur : 10.4.21-MariaDB
-- Version de PHP : 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `needsecurity`
--

-- --------------------------------------------------------

--
-- Structure de la table `trames`
--

CREATE TABLE `trames` (
  `id` int(11) NOT NULL,
  `frame_date` varchar(64) NOT NULL,
  `version` int(4) NOT NULL,
  `header_length` int(4) NOT NULL,
  `service` varchar(64) NOT NULL,
  `identification` varchar(64) NOT NULL,
  `flags_code` varchar(64) NOT NULL,
  `ttl` int(4) NOT NULL,
  `protocol_name` varchar(32) NOT NULL,
  `protocol_checksum_status` varchar(64) NOT NULL,
  `protocol_ports_from` int(6) NOT NULL,
  `protocol_ports_dest` int(6) NOT NULL,
  `header_checksum` varchar(64) NOT NULL,
  `ip_from` varchar(32) NOT NULL,
  `ip_dest` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `trames`
--

INSERT INTO `trames` (`id`, `frame_date`, `version`, `header_length`, `service`, `identification`, `flags_code`, `ttl`, `protocol_name`, `protocol_checksum_status`, `protocol_ports_from`, `protocol_ports_dest`, `header_checksum`, `ip_from`, `ip_dest`) VALUES
(33, '1608219651', 4, 20, '0x00', '0xf30f', '0x00', 128, 'UDP', 'disabled', 50046, 3481, 'unverified', 'c0a8014a', '3470ff25'),
(34, '1608219649', 4, 20, '0x00', '0xf30e', '0x00', 128, 'UDP', 'disabled', 50046, 3481, 'unverified', 'c0a8014a', '3470ff25'),
(35, '1608219647', 4, 20, '0x00', '0xf30d', '0x00', 128, 'UDP', 'disabled', 50046, 3481, 'unverified', 'c0a8014a', '3470ff25'),
(36, '1608219645', 4, 20, '0x00', '0xf30c', '0x00', 128, 'UDP', 'disabled', 50046, 3481, 'unverified', 'c0a8014a', '3470ff25'),
(37, '1608219640', 4, 20, '0x00', '0x92ce', '0x40', 128, 'TLSv1.2', 'disabled', 63440, 443, 'unverified', 'c0a8014a', '343111a8'),
(38, '1608219635', 4, 20, '0x00', '0x92d0', '0x40', 128, 'TLSv1.2', 'disabled', 63440, 443, 'unverified', 'c0a8014a', '343111a8'),
(39, '1608219630', 4, 20, '0x00', '0xa132', '0x00', 128, 'ICMP', 'good', 51062, 443, '0x0000', 'c0a8014a', 'acd913e3'),
(40, '1608219620', 4, 20, '0x00', '0xa132', '0x00', 99, 'ICMP', 'good', 51062, 443, '0xc31d', 'acd913e3', 'c0a8014a'),
(41, '1607951036', 4, 20, '0x00', '0x9927', '0x40', 128, 'TCP', 'disabled', 51062, 443, 'unverified', 'c0a8014a', 'd83ac6ce'),
(42, '1607951031', 4, 20, '0x00', '0x9927', '0x00', 121, 'TCP', 'disabled', 51062, 443, 'unverified', 'd83aa80c', 'c0a8014a'),
(43, '1606910038', 4, 20, '0x00', '0xf2f9', '0x00', 117, 'ICMP', 'good', 51062, 443, '0xc312', 'acd913e3', 'c0a8014a'),
(44, '1606910036', 4, 20, '0x00', '0xf2f9', '0x00', 128, 'ICMP', 'good', 51062, 443, '0x0000', 'c0a8014a', 'acd913e3'),
(45, '1606910000', 4, 20, '0x00', '0xd912', '0x00', 128, 'ICMP', 'good', 51062, 443, '0x0000', 'c0a8014a', 'acd913e3'),
(46, '1606909998', 4, 20, '0x00', '0xd914', '0x00', 128, 'ICMP', 'good', 51062, 443, '0x0020', 'c0a8014a', 'acd913e3'),
(47, '1606906654', 4, 20, '0x00', '0xa443', '0x00', 128, 'ICMP', 'good', 51062, 443, '0x0000', 'c0a8014a', 'acd913e3'),
(48, '1606906653', 4, 20, '0x00', '0xa443', '0x00', 117, 'ICMP', 'good', 51062, 443, '0xc312', 'acd913e3', 'c0a8014a');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `trames`
--
ALTER TABLE `trames`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `trames`
--
ALTER TABLE `trames`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
