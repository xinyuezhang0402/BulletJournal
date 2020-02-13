package com.bulletjournal.controller;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import com.bulletjournal.controller.models.*;
import com.google.common.collect.ImmutableList;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;

/**
 * Tests {@link ProjectController}
 */
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class ProjectControllerTest {
    private static final String ROOT_URL = "http://localhost:";
    private final String expectedOwner = "BulletJournal";
    private final String[] sampleUsers = {
            "Xavier",
            "bbs1024",
            "ccc",
            "Thinker",
            "Joker",
            "mqm",
            "hero",
            "bean",
            "xlf",
            "999999",
            "0518",
            "Scarlet",
            "lsx9981"};
    private TestRestTemplate restTemplate = new TestRestTemplate();

    @LocalServerPort
    int randomServerPort;

    @Before
    public void setup() {
        restTemplate.getRestTemplate().setRequestFactory(new HttpComponentsClientHttpRequestFactory());
    }

    @Test
    public void testCRUD() throws Exception {
        String projectName = "P0";
        List<Group> groups = createGroups(expectedOwner);
        Group group = groups.get(0);
        int count = 1;
        for (String username : Arrays.asList(sampleUsers).subList(0, 3)) {
            group = addUserToGroup(group, username, ++count);
        }

        group = groups.get(1);
        groups = addUsersToGroup(group, Arrays.asList(sampleUsers).subList(0, 5));

        Project p1 = createProject(projectName, expectedOwner);

        // update project name from "P0" to "P1"
        String projectNewName = "P1";
        UpdateProjectParams updateProjectParams = new UpdateProjectParams();
        updateProjectParams.setName(projectNewName);
        ResponseEntity<Project> response = this.restTemplate.exchange(
                ROOT_URL + randomServerPort + ProjectController.PROJECT_ROUTE,
                HttpMethod.PATCH,
                new HttpEntity<>(updateProjectParams),
                Project.class,
                p1.getId());
        p1 = response.getBody();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(projectNewName, p1.getName());
        assertEquals(expectedOwner, p1.getOwner());
        assertEquals(ProjectType.LEDGER, p1.getProjectType());
        assertEquals(com.bulletjournal.repository.models.Group.DEFAULT_NAME, p1.getGroup().getName());
        assertEquals(expectedOwner, p1.getGroup().getOwner());

        // create other projects
        Project p2 = createProject("P2", expectedOwner);
        Project p3 = createProject("P3", expectedOwner);
        Project p4 = createProject("P4", expectedOwner);
        Project p5 = createProject("P5", expectedOwner);
        Project p6 = createProject("P6", expectedOwner);

        /**
         *  p1
         *   |
         *    -- p2
         *   |   |
         *   |    -- p3
         *   |
         *    -- p4
         *
         *  p5
         *   |
         *    -- p6
         */
        List<Project> projectRelations = new ArrayList<>();
        projectRelations.add(p1);
        p1.addSubProject(p2);
        p1.addSubProject(p4);
        p2.addSubProject(p3);
        projectRelations.add(p5);
        p5.addSubProject(p6);
        // Set user's project relations
        this.restTemplate.exchange(
                ROOT_URL + randomServerPort + ProjectController.PROJECTS_ROUTE,
                HttpMethod.PUT,
                new HttpEntity<>(projectRelations),
                Void.class
        );

        ResponseEntity<Project[]> projectsResponse = this.restTemplate.exchange(
                ROOT_URL + randomServerPort + ProjectController.PROJECTS_ROUTE,
                HttpMethod.GET,
                null,
                Project[].class);
        assertEquals(HttpStatus.OK, projectsResponse.getStatusCode());
        Project[] projects = projectsResponse.getBody();
        assertEquals(2, projects.length);
        assertEquals(p1, projects[0]);
        assertEquals(p5, projects[1]);
        assertEquals(2, projects[0].getSubProjects().size());
        assertEquals(p2, projects[0].getSubProjects().get(0));
        assertEquals(p4, projects[0].getSubProjects().get(1));
        assertEquals(1, projects[1].getSubProjects().size());
        assertEquals(p6, projects[1].getSubProjects().get(0));
        assertEquals(1, projects[0].getSubProjects().get(0).getSubProjects().size());
        assertEquals(p3, projects[0].getSubProjects().get(0).getSubProjects().get(0));

        getNotifications();
    }

    private void getNotifications() {
        ResponseEntity<Notification[]> notificationsResponse = this.restTemplate.exchange(
                ROOT_URL + randomServerPort + NotificationController.NOTIFICATIONS_ROUTE,
                HttpMethod.GET,
                null,
                Notification[].class);
        assertEquals(HttpStatus.OK, notificationsResponse.getStatusCode());
        List<Notification> notifications = Arrays.asList(notificationsResponse.getBody());
        assertEquals(0, notifications.size());
    }

    private List<Group> getGroups(List<Group> expected) {
        ResponseEntity<Group[]> groupsResponse = this.restTemplate.exchange(
                ROOT_URL + randomServerPort + GroupController.GROUPS_ROUTE,
                HttpMethod.GET,
                null,
                Group[].class);
        List<Group> groups = Arrays.asList(groupsResponse.getBody());
        Collections.sort(groups, Comparator.comparing(Group::getName));
        if (expected != null) {
            assertEquals(expected.size(), groups.size());
            for (int i = 0; i < expected.size(); i++) {
                assertEquals(expected.get(i), groups.get(i));
                List<UserGroup> userGroups = groups.get(i).getUsers();
                assertEquals(1, userGroups.size());
                assertEquals(true, userGroups.get(0).isAccepted());
                assertEquals(expectedOwner, userGroups.get(0).getName());
                assertNotNull(userGroups.get(0).getThumbnail());
                assertNotNull(userGroups.get(0).getAvatar());
            }
        }
        return groups;
    }

    private List<Group> createGroups(String owner) {
        List<Group> groups = getGroups(null);
        assertEquals(1, groups.size());
        Group g = groups.get(0);
        Group g1 = createGroup("G0", owner);
        Group g2 = createGroup("G2", owner);
        Group g3 = createGroup("G3", owner);
        getGroups(ImmutableList.of(g, g1, g2, g3));

        String groupNewName = "G1";
        UpdateGroupParams updateGroupParams = new UpdateGroupParams();
        updateGroupParams.setName(groupNewName);

        // Update group name from "G0" to "G1"
        ResponseEntity<Group> response = this.restTemplate.exchange(
                ROOT_URL + randomServerPort + GroupController.GROUP_ROUTE,
                HttpMethod.PATCH,
                new HttpEntity<>(updateGroupParams),
                Group.class,
                g1.getId());
        g1 = response.getBody();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(groupNewName, g1.getName());

        // Delete Group "G3"
        ResponseEntity<?> deleteResponse = this.restTemplate.exchange(
                ROOT_URL + randomServerPort + GroupController.GROUP_ROUTE,
                HttpMethod.DELETE,
                null,
                Void.class,
                g3.getId());
        assertEquals(HttpStatus.OK, deleteResponse.getStatusCode());
        getGroups(ImmutableList.of(g, g1, g2));

        // Delete Group "Default"
        deleteResponse = this.restTemplate.exchange(
                ROOT_URL + randomServerPort + GroupController.GROUP_ROUTE,
                HttpMethod.DELETE,
                null,
                Void.class,
                g.getId());
        assertEquals(HttpStatus.UNAUTHORIZED, deleteResponse.getStatusCode());
        return getGroups(ImmutableList.of(g, g1, g2));
    }

    private List<Group> addUsersToGroup(final Group group, List<String> usernames) {
        AddUserGroupsParams addUserGroupsParams = new AddUserGroupsParams();
        for (String username : usernames) {
            addUserGroupsParams.getUserGroups().add(new AddUserGroupParams(group.getId(), username));
        }
        ResponseEntity<Group[]> groupsResponse = this.restTemplate.exchange(
                ROOT_URL + randomServerPort + GroupController.ADD_USER_GROUPS_ROUTE,
                HttpMethod.POST,
                new HttpEntity<>(addUserGroupsParams),
                Group[].class);
        List<Group> groups = Arrays.asList(groupsResponse.getBody());
        Group updated = groups.stream().filter(g -> group.getName().equals(g.getName())).findFirst().get();
        assertEquals(usernames.size() + 1, updated.getUsers().size());
        return groups;
    }

    private Group addUserToGroup(Group group, String username, int expectedSize) {
        AddUserGroupParams addUserGroupParams = new AddUserGroupParams(group.getId(), username);
        ResponseEntity<Group> groupsResponse = this.restTemplate.exchange(
                ROOT_URL + randomServerPort + GroupController.ADD_USER_GROUP_ROUTE,
                HttpMethod.POST,
                new HttpEntity<>(addUserGroupParams),
                Group.class);
        Group updated = groupsResponse.getBody();
        assertEquals(expectedSize, updated.getUsers().size());
        return updated;
    }

    private Group createGroup(String groupName, String expectedOwner) {
        CreateGroupParams group = new CreateGroupParams(groupName);
        ResponseEntity<Group> response = this.restTemplate.exchange(
                ROOT_URL + randomServerPort + GroupController.GROUPS_ROUTE,
                HttpMethod.POST,
                new HttpEntity<>(group),
                Group.class);
        Group created = response.getBody();
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(groupName, created.getName());
        assertEquals(expectedOwner, created.getOwner());

        return created;
    }

    private Project createProject(String projectName, String expectedOwner) {
        CreateProjectParams project = new CreateProjectParams(projectName, ProjectType.LEDGER);
        ResponseEntity<Project> response = this.restTemplate.exchange(
                ROOT_URL + randomServerPort + ProjectController.PROJECTS_ROUTE,
                HttpMethod.POST,
                new HttpEntity<>(project),
                Project.class);
        Project created = response.getBody();
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(projectName, created.getName());
        assertEquals(expectedOwner, created.getOwner());
        assertEquals(ProjectType.LEDGER, created.getProjectType());
        assertEquals(com.bulletjournal.repository.models.Group.DEFAULT_NAME, created.getGroup().getName());
        assertEquals(expectedOwner, created.getGroup().getOwner());
        return created;
    }
}

