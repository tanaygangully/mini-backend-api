DELIMITER $$

CREATE PROCEDURE sp_create_cluster(
    IN c_name VARCHAR(100),
    IN p_id INT
)
BEGIN
    INSERT INTO clusters(cluster_name, point_id)
    VALUES(c_name, p_id);
END$$

DELIMITER ;
