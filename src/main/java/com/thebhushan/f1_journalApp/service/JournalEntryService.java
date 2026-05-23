package com.thebhushan.f1_journalApp.service;

import com.thebhushan.f1_journalApp.entity.JournalEntry;
import com.thebhushan.f1_journalApp.entity.User;
import com.thebhushan.f1_journalApp.repository.JournalEntryRepository;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Component
public class JournalEntryService {
    @Autowired
    private JournalEntryRepository journalEntryRepository; // dependency object create.
    @Autowired
    private  UserService userService;


    @Transactional
    public void saveEntry(JournalEntry journalEntry, String userName) {
        try{
            User user=userService.findByUserName(userName);
            journalEntry.setDate(LocalDateTime.now());// date automatically save
            JournalEntry saved = journalEntryRepository.save(journalEntry);
            user.getJournalEntries().add(saved);
            userService.saveUser(user);
        } catch(Exception e){
            log.error("e: ", e);
        }
    }


    public void saveEntry(JournalEntry journalEntry) {
       journalEntryRepository.save(journalEntry);
    }

    public List<JournalEntry> getAll() {
        return journalEntryRepository.findAll();
    }

    public Optional<JournalEntry> findById(ObjectId id) {
            return  journalEntryRepository.findById(id);
    }

    @Transactional
    public boolean deleteById(ObjectId id, String userName) {
        boolean removed=false;
        try {
            User user=userService.findByUserName(userName);
             removed=user.getJournalEntries().removeIf(x-> x.getId().equals(id));
            if (removed) {
                userService.saveUser(user);
                journalEntryRepository.deleteById(id);
            }
        }catch (Exception e){
            log.error("e: ", e);
            throw  new RuntimeException("An error Occurred while deleting the entry.",e);
        }
        return removed;
    }

}
